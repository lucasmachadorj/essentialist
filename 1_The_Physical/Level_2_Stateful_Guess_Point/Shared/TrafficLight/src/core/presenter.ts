import { Clock } from "./domain/clock";
import { GlobalCache } from "./globalCache";
import { ViewModel } from "./viewModel";

export class Presenter {
  private viewModel: ViewModel;

  constructor(cache: GlobalCache) {
    cache.subscribeToClock(this);
    this.viewModel = new ViewModel();
  }

  updateClock(clock: Clock) {
    const currentTime = clock.getCurrentTime();
    this.viewModel.setCurrentTime(currentTime);
  }

  getCurrentTime(): number {
    return this.viewModel.getCurrentTime();
  }
}
