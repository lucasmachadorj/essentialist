import { TrafficLight } from "../../core/domain/trafficLight";
import { GlobalCache } from "../../core/shared/globalCache";
import { ViewModel } from "./viewModel";

export class Presenter {
  private viewModel: ViewModel;

  constructor(cache: GlobalCache) {
    cache.subscribeToClock(this);
    cache.subscribeToTrafficLights(this);
    this.viewModel = new ViewModel();
  }

  updateClock(currentTime: number) {
    this.viewModel.setCurrentTime(currentTime);
  }

  updateTrafficLights(trafficLights: TrafficLight[]) {
    const trafficLightsState = trafficLights.map((t) => ({
      id: t.getId(),
      currentState: t.getState(),
      turnedOnAt: t.getTurnedOnAt() || 0,
    }));
    this.viewModel.setTrafficLights(trafficLightsState);
  }

  getCurrentTime(): number {
    return this.viewModel.getCurrentTime();
  }

  getTrafficLights() {
    return this.viewModel.getTrafficLights();
  }

  getTrafficLight(id: string) {
    return this.viewModel.getTrafficLight(id);
  }

  isTrafficLightLimitReached(): boolean {
    return this.getTrafficLights().length >= 3;
  }
}
