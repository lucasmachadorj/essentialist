import { Clock } from "./clock";
import { TrafficLight } from "./trafficLight";

describe("Clock", () => {
  it("should be defined", () => {
    expect(Clock).toBeDefined();
  });

  it("should start with time delay of 0", () => {
    const clock = new Clock();
    expect(clock.getCurrentTime()).toBe(0);
  });

  it("should be able to increase time delay, such as add 30 s", () => {
    const clock = new Clock();
    clock.goToFuture(30);
    expect(clock.getCurrentTime()).toBe(30);
  });

  it("should subscribe a traffic light to the clock", () => {
    const clock = new Clock();
    const trafficLight = new TrafficLight(clock);
    clock.subscribe(trafficLight);
    expect(clock.getSubscribers()).toContain(trafficLight);
  });

  it("should notify subscribers when time delay is increased", () => {
    const clock = new Clock();
    const trafficLight = new TrafficLight(clock);
    clock.subscribe(trafficLight);
    clock.goToFuture(30);
    expect(trafficLight.trigger).toHaveBeenCalled();
  });

  it("should advance 1 sec when tick", () => {
    const clock = new Clock();
    const lastTime = clock.getCurrentTime();
    clock.tick();
    expect(clock.getCurrentTime()).toBe(lastTime + 1);
  });
});
