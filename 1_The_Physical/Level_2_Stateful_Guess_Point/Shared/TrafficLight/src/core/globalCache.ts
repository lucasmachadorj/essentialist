import { Clock } from "./domain/clock";

export class GlobalCache {
  private clock: Clock | null;

  constructor() {
    this.clock = null;
  }

  getCurrentTime(): number {
    return this.clock ? this.clock.getCurrentTime() : 0;
  }

  saveClock(clock: Clock) {
    this.clock = clock;
  }
}
