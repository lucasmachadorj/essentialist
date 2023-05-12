import { TrafficLight } from "./trafficLight";
import { Collection } from "./types";

export class TrafficLights implements Collection<TrafficLight> {
  private trafficLights: TrafficLight[] = [];

  private constructor() {}

  static create() {
    return new TrafficLights();
  }

  add(trafficLight: TrafficLight) {
    this.trafficLights.push(trafficLight);
  }

  getItems(): TrafficLight[] {
    return this.trafficLights;
  }

  count() {
    return this.trafficLights.length;
  }

  notifyAll() {
    this.trafficLights.forEach((trafficLight) => {
      trafficLight.trigger();
    });
  }
}
