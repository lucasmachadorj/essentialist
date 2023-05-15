import { Clock } from "./domain/clock";
import { Presenter } from "./presenter";

export class GlobalCache {
  private clock: Clock | null;
  private listeners: Record<string, Presenter[]>;

  constructor() {
    this.clock = null;
    this.listeners = {};
  }

  getClock(): Clock | null {
    return this.clock;
  }

  saveClock(clock: Clock) {
    this.clock = clock;
    this.propagateClock();
  }

  subscribeToClock(presenter: Presenter) {
    this.listeners["clock"] = this.listeners["clock"] || [];
    this.listeners["clock"].push(presenter);
  }

  private propagateClock() {
    const listeners = this.listeners["clock"];
    if (!listeners) {
      return;
    }
    if (!this.clock) return;
    listeners.forEach((listener) => listener.updateClock(this.clock!));
  }
}
