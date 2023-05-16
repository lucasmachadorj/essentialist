import { Clock } from "../../core/domain/clock";
import { TrafficLight } from "../../core/domain/trafficLight";
import { GlobalCache } from "../../core/shared/globalCache";

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
    this.cache.addTrafficLight(trafficLight);
  }

  getTrafficLights() {
    return this.cache.getTrafficLights();
  }

  turnOnTrafficLight(id: string) {
    const trafficLight = this.cache.getTrafficLight(id);
    if (!trafficLight) {
      return;
    }
    trafficLight.turnOn();
    this.cache.updateTrafficLight(trafficLight);
  }

  turnOffTrafficLight(id: string) {
    const trafficLight = this.cache.getTrafficLight(id);
    if (!trafficLight) {
      return;
    }
    trafficLight.turnOff();
    this.cache.updateTrafficLight(trafficLight);
  }
}
