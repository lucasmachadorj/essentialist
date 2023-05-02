import { TrafficLight } from "./trafficLight";
import { TrafficLightEventTypes } from "./trafficLightEvent";

describe("TrafficLight", () => {
  it("should be defined", () => {
    expect(TrafficLight).toBeDefined();
  });

  it("should start off", () => {
    const trafficLight = new TrafficLight();
    expect(trafficLight.isOff()).toBe(true);
  });

  it("should be able to turn on", () => {
    const trafficLight = new TrafficLight();
    trafficLight.turnOn();
    expect(trafficLight.isOn()).toBe(true);
  });

  it("should be able to turn off when is boot", () => {
    const trafficLight = new TrafficLight();
    trafficLight.turnOn();
    trafficLight.turnOff();
    expect(trafficLight.isOff()).toBe(true);
  });

  it("should advance to boot when turned on", () => {
    const trafficLight = new TrafficLight();
    trafficLight.turnOn();
    expect(trafficLight.isBoot()).toBe(true);
  });

  it("should advance to green when boot", () => {
    const trafficLight = new TrafficLight();
    trafficLight.turnOn();
    trafficLight.advance();
    expect(trafficLight.isGreen()).toBe(true);
  });

  it("should not advance to green when off", () => {
    const trafficLight = new TrafficLight();
    trafficLight.advance();
    expect(trafficLight.isOff()).toBe(true);
  });

  it("should advance to yellow when green", () => {
    const trafficLight = new TrafficLight();
    trafficLight.turnOn();
    trafficLight.advance();
    trafficLight.advance();
    expect(trafficLight.isYellow()).toBe(true);
  });

  it("should advance to red when yellow", () => {
    const trafficLight = new TrafficLight();
    trafficLight.turnOn();
    trafficLight.advance();
    trafficLight.advance();
    trafficLight.advance();
    expect(trafficLight.isRed()).toBe(true);
  });

  it("should advance to green when red", () => {
    const trafficLight = new TrafficLight();
    trafficLight.turnOn();
    trafficLight.advance();
    trafficLight.advance();
    trafficLight.advance();
    trafficLight.advance();
    expect(trafficLight.isGreen()).toBe(true);
  });

  it("should not advance when off", () => {
    const trafficLight = new TrafficLight();
    trafficLight.advance();
    expect(trafficLight.isOff()).toBe(true);
  });

  it("should turn off when green", () => {
    const trafficLight = new TrafficLight();
    trafficLight.turnOn();
    trafficLight.advance();
    trafficLight.turnOff();
    expect(trafficLight.isOff()).toBe(true);
  });

  it("should turn off when yellow", () => {
    const trafficLight = new TrafficLight();
    trafficLight.turnOn();
    trafficLight.advance();
    trafficLight.advance();
    trafficLight.turnOff();
    expect(trafficLight.isOff()).toBe(true);
  });

  it("should turn off when red", () => {
    const trafficLight = new TrafficLight();
    trafficLight.turnOn();
    trafficLight.advance();
    trafficLight.advance();
    trafficLight.advance();
    trafficLight.turnOff();
    expect(trafficLight.isOff()).toBe(true);
  });

  it("should have no initial event", () => {
    const trafficLight = new TrafficLight();
    expect(trafficLight.getEvents()).toHaveLength(0);
  });

  it("should have one event when turned on", () => {
    const trafficLight = new TrafficLight();
    trafficLight.turnOn();
    expect(trafficLight.getEvents()).toHaveLength(1);
    expect(
      trafficLight.getEventsOfType(TrafficLightEventTypes.TurnedOn)
    ).toHaveLength(1);
  });

  it("should have two events when turned on and off", () => {
    const trafficLight = new TrafficLight();
    trafficLight.turnOn();
    trafficLight.turnOff();
    expect(trafficLight.getEvents()).toHaveLength(2);
    expect(
      trafficLight.getEventsOfType(TrafficLightEventTypes.TurnedOn)
    ).toHaveLength(1);
    expect(
      trafficLight.getEventsOfType(TrafficLightEventTypes.TurnedOff)
    ).toHaveLength(1);
  });

  it("should have three events when turned on, advanced and off", () => {
    const trafficLight = new TrafficLight();
    trafficLight.turnOn();
    trafficLight.advance();
    trafficLight.turnOff();
    expect(trafficLight.getEvents()).toHaveLength(3);
    expect(
      trafficLight.getEventsOfType(TrafficLightEventTypes.AdvancedToGreen)
    ).toHaveLength(1);
  });
});
