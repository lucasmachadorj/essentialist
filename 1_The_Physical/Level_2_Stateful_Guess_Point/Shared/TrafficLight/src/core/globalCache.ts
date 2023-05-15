import { Clock } from "./domain/clock";

export class GlobalCache {
  private clock: Clock | null;

  constructor() {
    this.clock = null;
  }

  getClock(): Clock | null {
    return this.clock;
  }

  saveClock(clock: Clock) {
    this.clock = clock;
  }
}
