import { Clock } from "./domain/clock";
import { Repository } from "./repository";

export class Controller {
  constructor(private repository: Repository) {}

  initializeClock() {
    let clock = this.repository.getClock();
    if (clock) {
      return;
    }
    clock = Clock.create();
    this.repository.saveClock(clock);
  }

  updateClock() {
    this.repository.updateTime();
  }
}
