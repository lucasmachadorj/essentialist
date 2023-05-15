import { Clock } from "./domain/clock";
import { TrafficLight } from "./domain/trafficLight";
import { Presenter } from "./presenter";

type TrafficLightDTO = {
  id: string;
  currentState: string;
};
export class GlobalCache {
  private clock: Clock | null;
  private trafficLights: TrafficLightDTO[];

  private listeners: Record<string, Presenter[]>;

  constructor() {
    this.clock = null;
    this.listeners = {};
    this.trafficLights = [];
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

  subscribeToTrafficLights(presenter: Presenter) {
    this.listeners["trafficLights"] = this.listeners["trafficLights"] || [];
    this.listeners["trafficLights"].push(presenter);
  }

  addTrafficLight(trafficLight: TrafficLightDTO) {
    this.trafficLights.push(trafficLight);
    this.propagateTrafficLights();
  }

  getTrafficLights() {
    return this.trafficLights;
  }

  private propagateClock() {
    const listeners = this.listeners["clock"];
    if (!listeners) {
      return;
    }
    if (!this.clock) return;
    listeners.forEach((listener) => listener.updateClock(this.clock!));
  }

  private propagateTrafficLights() {
    const listeners = this.listeners["trafficLights"];
    if (!listeners) {
      return;
    }
    listeners.forEach((listener) =>
      listener.updateTrafficLights(this.trafficLights)
    );
  }
}
