import { Db, ObjectId } from 'mongodb';
import { CreateWidget, Widget } from '../models/widgets.models';

export class WidgetService {
  constructor(private db: Db) {}

  async fetchAllWidgets(): Promise<Widget[]> {
    return this.db.collection<Widget>('widgets').find().toArray();
  }

  async createWidget(location: string, userId?: string): Promise<Widget> {
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
}
