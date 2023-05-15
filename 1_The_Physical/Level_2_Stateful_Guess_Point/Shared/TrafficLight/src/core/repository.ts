import { Clock } from "./domain/clock";
import { TrafficLight } from "./domain/trafficLight";
import { GlobalCache } from "./shared/globalCache";

export class Repository {
  constructor(private cache: GlobalCache) {}

  getClock(): Clock | null {
    return null;
  }

  saveClock(clock: Clock) {
    this.cache.saveClock(clock);
  }

  getCurrentTime(): number {
    const clock = this.cache.getClock();
    return clock ? clock.getCurrentTime() : 0;
  }

  updateTime() {
    const clock = this.cache.getClock();
    if (clock) {
      clock.tick();
      this.cache.saveClock(clock);
    }
  }

  addTrafficLight() {
    const clock = this.cache.getClock();
    if (!clock) {
      return;
    }
    const trafficLight = new TrafficLight(clock);
    const trafficLightDTO = {
      id: trafficLight.getId(),
      currentState: trafficLight.getState(),
    };
    this.cache.addTrafficLight(trafficLightDTO);
  }

  getTrafficLights() {
    return this.cache.getTrafficLights();
  }
}
