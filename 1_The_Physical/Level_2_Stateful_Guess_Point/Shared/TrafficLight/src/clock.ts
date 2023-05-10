import { TrafficLight } from "./trafficLight";

export class Clock {
  private timeDelay: number;
  private subscribers: TrafficLight[];

  constructor() {
    this.timeDelay = 0;
    this.subscribers = [];
  }

  getTimeDelay(): number {
    return this.timeDelay;
  }

  increaseTimeDelay(timeDelay: number): void {
    this.timeDelay += timeDelay;
  }

  subscribe(trafficLight: TrafficLight): void {
    this.subscribers.push(trafficLight);
  }

  getSubscribers(): TrafficLight[] {
    return this.subscribers;
  }

  tick() {
    this.increaseTimeDelay(1);
    this.subscribers.forEach((subscriber) => {
      subscriber.trigger();
    });
  }
}
