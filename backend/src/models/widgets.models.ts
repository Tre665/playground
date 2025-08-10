import { ObjectId } from 'mongodb';
import { Location } from './location.models';

/** Represents a weather widget for a specific city */
export interface Widget {
  /** The _id of the widget */
  _id: ObjectId;
  /** The location information for the widget */
  location: Location;
  /** The date and time the widget was created */
  createdAt: Date;
  /** The date and time when any field of the widget was last updated */
  updatedAt?: Date;
  /** The user ID of the user who created the widget */
  userId?: ObjectId | null;
}

/**
 * Represents the data needed to create a new widget in the data store
 */
export interface CreateWidget extends Omit<Widget, '_id'> {}
