import { TrafficLight } from "./trafficLight";

class Clock {
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
}

describe("Clock", () => {
  it("should be defined", () => {
    expect(Clock).toBeDefined();
  });

  it("should start with time delay of 0", () => {
    const clock = new Clock();
    expect(clock.getTimeDelay()).toBe(0);
  });

  it("should be able to increase time delay, such as add 30 s", () => {
    const clock = new Clock();
    clock.increaseTimeDelay(30);
    expect(clock.getTimeDelay()).toBe(30);
  });

  it("should subscribe a traffic light to the clock", () => {
    const clock = new Clock();
    const trafficLight = new TrafficLight();
    clock.subscribe(trafficLight);
    expect(clock.getSubscribers()).toContain(trafficLight);
  });
});
