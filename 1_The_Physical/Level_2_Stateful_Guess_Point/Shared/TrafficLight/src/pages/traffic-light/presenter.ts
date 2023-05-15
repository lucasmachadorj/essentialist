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

  updateTrafficLights(trafficLights: { id: string; currentState: string }[]) {
    this.viewModel.setTrafficLights(trafficLights);
  }

  getCurrentTime(): number {
    return this.viewModel.getCurrentTime();
  }

  getTrafficLights() {
    return this.viewModel.getTrafficLights();
  }
}
