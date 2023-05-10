import { TrafficLight } from "./trafficLight";
import { TrafficLights } from "./trafficLights";

type Seconds = number;
export class Clock {
  private currentTime: Seconds;
  private subscribers: TrafficLights;

  constructor() {
    this.currentTime = 0;
    this.subscribers = TrafficLights.create();
  }

  getCurrentTime(): Seconds {
    return this.currentTime;
  }

  goToFuture(timeDelay: Seconds): void {
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
