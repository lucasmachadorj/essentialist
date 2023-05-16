import { Clock } from "../../core/domain/clock";
import { Repository } from "./repository";

export class Controller {
  constructor(private repository: Repository) {}

  initializeClockUseCase() {
    let clock = this.repository.getClock();
    if (clock) {
      return;
    }
    clock = Clock.create();
    this.repository.saveClock(clock);
  }

  updateClockUseCase() {
    this.repository.updateTime();
  }

  addTrafficLightUseCase() {
    this.repository.addTrafficLight();
  }

  turnOnTrafficLightUseCase(id: string) {
    this.repository.turnOnTrafficLight(id);
  }

  turnOffTrafficLightUseCase(id: string) {
    this.repository.turnOffTrafficLight(id);
  }
}
