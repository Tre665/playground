import { GeolocationDto } from './geolocation.types';

/** Represents a weather widget for a specific city */
export interface WidgetDto {
  /** The _id of the widget */
  _id: string;
  /** The Location information for the widget */
  location: GeolocationDto;
  /** The date and time the widget was created */
  createdAt: Date;
  /** The date and time when any field of the widget was last updated */
  updatedAt?: Date;
  /** The user ID of the user who created the widget */
  userId?: string | null;
}

/** The payload for creating a new widget */
export interface CreateWidgetPayloadDto {
  /** The Location information for the widget */
  location: GeolocationDto;
  /** The user ID of the user who created the widget */
  userId?: string;
}
