import { Clock } from "./domain/clock";
import { GlobalCache } from "./globalCache";

export class Repository {
  constructor(private cache: GlobalCache) {}

  getClock(): Clock | null {
    return null;
  }

  saveClock(clock: Clock) {
    this.cache.saveClock(clock);
  }

  getCurrentTime(): number {
    return this.cache.getCurrentTime();
  }
}
