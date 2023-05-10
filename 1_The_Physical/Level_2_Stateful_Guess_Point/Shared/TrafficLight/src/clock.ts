import { TrafficLight } from "./trafficLight";

export class Clock {
  private currentTime: number;
  private subscribers: TrafficLight[];

  constructor() {
    this.currentTime = 0;
    this.subscribers = [];
  }

  getCurrentTime(): number {
    return this.currentTime;
  }

  goToFuture(timeDelay: number): void {
    this.currentTime += timeDelay;
  }

  subscribe(trafficLight: TrafficLight): void {
    this.subscribers.push(trafficLight);
  }

  getSubscribers(): TrafficLight[] {
    return this.subscribers;
  }

  tick() {
    this.goToFuture(1);
    this.subscribers.forEach((subscriber) => {
      subscriber.trigger();
    });
  }
}
