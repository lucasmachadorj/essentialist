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
    const clock = this.cache.getClock();
    return clock ? clock.getCurrentTime() : 0;
  }

  updateTime() {
    const clock = this.cache.getClock();
    if (clock) {
      clock.tick();
    }
  }
}
