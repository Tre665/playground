import { ObjectId } from '@fastify/mongodb';

/** Represents a weather widget for a specific city */
export interface Widget {
  _id: ObjectId;
  /** The city name */
  location: string;
  /** The date and time the widget was created */
  createdAt: Date;
  /** The date and time when any field of the widget was last updated */
  updatedAt?: Date;
  /** The user ID of the user who created the widget */
  userId?: ObjectId;
}
