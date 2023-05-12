import { TrafficLight } from "../../domain/trafficLight";
import { Repository } from "./repository";

export class Controller {
  private constructor(private repository: Repository) {}

  static create(repository: Repository): Controller {
    return new Controller(repository);
  }

  public updateClockUseCase(): void {
    this.repository.updateClock();
  }

  public addTrafficLightUseCase(): void {
    this.repository.addTrafficLight();
  }

  public turnOnTrafficLightUseCase(id: string): void {
    this.repository.turnOnTrafficLight(id);
  }

  public turnOffTrafficLightUseCase(id: string): void {
    this.repository.turnOffTrafficLight(id);
  }
}
