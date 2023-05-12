import { Clock } from "./clock";
import { TrafficLight } from "./trafficLight";

describe("Clock", () => {
  let clock: Clock;
  let trafficLight: TrafficLight;

  beforeEach(() => {
    clock = new Clock();
    trafficLight = new TrafficLight(clock);
    jest.spyOn(trafficLight, "trigger").mockImplementation(() => {});
  });

  it("should be defined", () => {
    expect(Clock).toBeDefined();
  });

  it("should start with time delay of 0", () => {
    expect(clock.getCurrentTime()).toBe(0);
  });

  it("should be able to increase time delay, such as add 30 s", () => {
    clock.goToFuture(30);
    expect(clock.getCurrentTime()).toBe(30);
  });

  it("should subscribe a traffic light to the clock", () => {
    clock.subscribe(trafficLight);
    expect(clock.getSubscribers()).toContain(trafficLight);
  });

  it("should notify subscribers after a tick of time", () => {
    clock.subscribe(trafficLight);
    clock.tick();
    expect(trafficLight.trigger).toHaveBeenCalled();
  });

  it("should advance 1 sec when tick", () => {
    const lastTime = clock.getCurrentTime();
    clock.tick();
    expect(clock.getCurrentTime()).toBe(lastTime + 1);
  });
});
