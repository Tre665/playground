import { Cache } from './index';

interface CacheEntry<T> {
  value: T;
  addedAt: number;
}

/**
 * Simple in-memory cache implementation with expiration handling.
 * The TTL for each entry can be set on instantiation in milliseconds,
 * and defaults to 5 * 60 * 1000 (5 minutes).
 */
export class InMemoryCache<T> implements Cache<T> {
  private cache = new Map<string, CacheEntry<T>>();

  /** creates a new in-memory cache with a default TTL of 5 minutes */
  constructor(private ttl = 5 * 60 * 1000) {}

  get(key: string): T | undefined {
    const entry = this.cache.get(key);
    if (entry === undefined) {
      return undefined;
    }

    if (this.isExpired(entry)) {
      this.cache.delete(key);
      return undefined;
    }

    return entry.value;
  }

  set(key: string, value: T): void {
    const newEntry = {
      addedAt: Date.now(),
      value,
    };

    this.cache.set(key, newEntry);
  }

  delete(key: string): void {
    this.cache.delete(key);
  }

  has(key: string): boolean {
    const entry = this.cache.get(key);
    if (entry === undefined) {
      return false;
    }

    if (this.isExpired(entry)) {
      this.cache.delete(key);
      return false;
    }

    return true;
  }

  private isExpired(entry: CacheEntry<T>): boolean {
    return Date.now() - entry.addedAt > this.ttl;
  }
}
