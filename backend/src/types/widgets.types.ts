/** Represents a weather widget for a specific city */
export interface Widget {
  /** The _id of the widget */
  _id: string;
  /** The city name */
  location: string;
  /** The date and time the widget was created */
  createdAt: Date;
  /** The date and time when any field of the widget was last updated */
  updatedAt?: Date;
  /** The user ID of the user who created the widget */
  userId?: string | null;
}

/** The payload for creating a new widget */
export interface CreateWidgetPayload {
  /** The city name */
  location: string;
  /** The user ID of the user who created the widget */
  userId?: string;
}
