import { Clock } from "../../core/domain/clock";
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

  addTrafficLight() {
    this.repository.addTrafficLight();
  }

  turnOnTrafficLight(id: string) {
    this.repository.turnOnTrafficLight(id);
  }
}
