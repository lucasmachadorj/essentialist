import { TrafficLight } from "./trafficLight";
import { TrafficLights } from "./trafficLights";

export class Clock {
  private currentTime: number;
  private subscribers: TrafficLights;

  constructor() {
    this.currentTime = 0;
    this.subscribers = TrafficLights.create();
  }

  getCurrentTime(): number {
    return this.currentTime;
  }

  goToFuture(timeDelay: number): void {
    this.currentTime += timeDelay;
  }

  subscribe(trafficLight: TrafficLight): void {
    this.subscribers.add(trafficLight);
  }

  getSubscribers(): TrafficLight[] {
    return this.subscribers.getItems();
  }

  tick() {
    this.goToFuture(1);
    this.subscribers.notifyAll();
  }
}
