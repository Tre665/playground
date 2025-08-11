import { Db, ObjectId } from 'mongodb';
import { CreateWidget, WeatherWidget, Widget } from '../models/widgets.models';
import { Location } from '../models/location.models';
import { fetchCurrentWeatherForLocation } from './open-weather.service';
import { mapWeatherDataToWidget } from '../models/widget.mappings';
import { WeatherApiResponse } from '../types/open-weather.types';
import { Cache } from '../cache';

// todo(tre): add proper type checking
export class WidgetService {
  constructor(
    private db: Db,
    private weatherDataCache: Cache<WeatherApiResponse>,
  ) {}

  async fetchAllWidgets(): Promise<WeatherWidget[]> {
    const widgets = await this.db.collection<Widget>('widgets').find().toArray();

    const weatherResults = await Promise.all(
      widgets.map(async (widget) => {
        const cacheKey = this.createCacheKey(widget.location.lat, widget.location.lon);
        const cachedValue = this.weatherDataCache.get(cacheKey);
        if (cachedValue !== undefined) {
          return cachedValue;
        }

        const weatherData = await fetchCurrentWeatherForLocation({
          lat: widget.location.lat,
          long: widget.location.lon,
        });

        this.weatherDataCache.set(cacheKey, weatherData);

        return weatherData;
      }),
    );

    const weatherWidgets = widgets.map((widget, index) =>
      mapWeatherDataToWidget(widget, weatherResults[index]),
    );

    return weatherWidgets;
  }

  async createWidget(location: Location, userId?: string): Promise<Widget> {
    const newWidget: CreateWidget = {
      location,
      userId: userId && ObjectId.isValid(userId) ? new ObjectId(userId) : null,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await this.db.collection<CreateWidget>('widgets').insertOne(newWidget);

    const { acknowledged = false, insertedId = null } = result || {};

    if (!acknowledged || !insertedId) {
      throw new Error('Failed to create widget');
    }

    return { _id: insertedId, ...newWidget };
  }

  async removeWidget(id: string): Promise<number> {
    if (!ObjectId.isValid(id)) {
      throw new Error('Invalid id');
    }

    const widgetId = new ObjectId(id);

    const result = await this.db.collection<Widget>('widgets').deleteOne({ _id: widgetId });

    const { acknowledged = false, deletedCount = 0 } = result || {};

    if (!acknowledged) {
      throw new Error('Failed to delete widget');
    }

    return deletedCount;
  }

  /** creates a cache key for a given location */
  private createCacheKey(lat: number, long: number): string {
    return `${lat},${long}`;
  }
}
