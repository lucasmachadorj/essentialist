import { Clock } from "./clock";
import { TrafficLight } from "./trafficLight";
import { TrafficLightEventTypes } from "./trafficLightEvent";

const tick = (n: number) => (clock: Clock) => {
  [...Array(n)].forEach(() => clock.tick());
};

const tick5 = tick(5);
const tick30 = tick(30);
const tick60 = tick(60);

const fromBootToGreen = (clock: Clock) => {
  clock.tick();
};

const fromBootToYellow = (clock: Clock) => {
  clock.tick();
  tick30(clock);
};

const fromBootToRed = (clock: Clock) => {
  clock.tick();
  tick30(clock);
  tick5(clock);
};

const fullCycleFromBoot = (clock: Clock) => {
  clock.tick();
  tick60(clock);
};

describe("TrafficLight", () => {
  let clock: Clock;
  beforeEach(() => {
    clock = new Clock();
  });

  it("should be defined", () => {
    expect(TrafficLight).toBeDefined();
  });

  it("should start off", () => {
    const trafficLight = new TrafficLight(clock);

    expect(trafficLight.isOff()).toBe(true);
  });

  it("should be able to turn on", () => {
    const trafficLight = new TrafficLight(clock);

    trafficLight.turnOn();

    expect(trafficLight.isOn()).toBe(true);
  });

  it("should be able to turn off when is boot", () => {
    const trafficLight = new TrafficLight(clock);

    trafficLight.turnOn();
    trafficLight.turnOff();

    expect(trafficLight.isOff()).toBe(true);
  });

  it("should advance to boot when turned on", () => {
    const trafficLight = new TrafficLight(clock);
    trafficLight.turnOn();
    expect(trafficLight.isBoot()).toBe(true);
  });

  it("should advance to green after 1 second", () => {
    const trafficLight = new TrafficLight(clock);
    trafficLight.turnOn();
    fromBootToGreen(clock);
    expect(trafficLight.isGreen()).toBe(true);
  });

  it("should not advance to green when off", () => {
    const trafficLight = new TrafficLight(clock);
    clock.tick();
    expect(trafficLight.isOff()).toBe(true);
  });

  it("should advance to yellow when green after 31 seconds", () => {
    const trafficLight = new TrafficLight(clock);
    trafficLight.turnOn();
    fromBootToYellow(clock);
    expect(trafficLight.isYellow()).toBe(true);
  });

  it("should advance to red when yellow after 36 seconds", () => {
    const trafficLight = new TrafficLight(clock);
    trafficLight.turnOn();
    fromBootToRed(clock);
    expect(trafficLight.isRed()).toBe(true);
  });

  it("should not advance when off", () => {
    const trafficLight = new TrafficLight(clock);
    clock.tick();
    expect(trafficLight.isOff()).toBe(true);
  });

  it("should turn off when green", () => {
    const trafficLight = new TrafficLight(clock);
    fromBootToGreen(clock);
    trafficLight.turnOff();
    expect(trafficLight.isOff()).toBe(true);
  });

  it("should turn off when yellow", () => {
    const trafficLight = new TrafficLight(clock);
    trafficLight.turnOn();
    fromBootToYellow(clock);
    trafficLight.turnOff();
    expect(trafficLight.isOff()).toBe(true);
  });

  it("should turn off when red", () => {
    const trafficLight = new TrafficLight(clock);
    trafficLight.turnOn();
    fromBootToRed(clock);
    trafficLight.turnOff();
    expect(trafficLight.isOff()).toBe(true);
  });

  it("should have no initial event", () => {
    const trafficLight = new TrafficLight(clock);
    expect(trafficLight.getEvents()).toHaveLength(0);
  });

  it("should have one event when turned on", () => {
    const trafficLight = new TrafficLight(clock);
    trafficLight.turnOn();
    expect(trafficLight.getEvents()).toHaveLength(1);
    expect(
      trafficLight.getEventsOfType(TrafficLightEventTypes.TurnedOn)
    ).toHaveLength(1);
  });

  it("should have two events when turned on and off", () => {
    const trafficLight = new TrafficLight(clock);
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

  it("should have three events when turn off after 1 second", () => {
    const trafficLight = new TrafficLight(clock);
    trafficLight.turnOn();
    fromBootToGreen(clock);
    trafficLight.turnOff();
    expect(trafficLight.getEvents()).toHaveLength(3);
    expect(
      trafficLight.getEventsOfType(TrafficLightEventTypes.AdvancedToGreen)
    ).toHaveLength(1);
  });

  it("should have four when turn off after 31 seconds", () => {
    const trafficLight = new TrafficLight(clock);
    trafficLight.turnOn();
    fromBootToYellow(clock);
    trafficLight.turnOff();
    expect(trafficLight.getEvents()).toHaveLength(4);
    expect(
      trafficLight.getEventsOfType(TrafficLightEventTypes.AdvancedToYellow)
    ).toHaveLength(1);
  });

  it("should have five events when turn off after 36 seconds", () => {
    const trafficLight = new TrafficLight(clock);
    trafficLight.turnOn();
    fromBootToRed(clock);
    trafficLight.turnOff();
    expect(trafficLight.getEvents()).toHaveLength(5);
    expect(
      trafficLight.getEventsOfType(TrafficLightEventTypes.AdvancedToRed)
    ).toHaveLength(1);
  });

  it("should have six events when turn off after 61 seconds", () => {
    const trafficLight = new TrafficLight(clock);

    trafficLight.turnOn();
    fullCycleFromBoot(clock);
    trafficLight.turnOff();

    expect(trafficLight.getEvents()).toHaveLength(6);
    expect(
      trafficLight.getEventsOfType(TrafficLightEventTypes.AdvancedToGreen)
    ).toHaveLength(2);
  });

  it("should not add a TurnedOn event when already on", () => {
    const trafficLight = new TrafficLight(clock);

    trafficLight.turnOn();
    trafficLight.turnOn();

    expect(trafficLight.getEvents()).toHaveLength(1);
    expect(
      trafficLight.getEventsOfType(TrafficLightEventTypes.TurnedOn)
    ).toHaveLength(1);
  });

  it("should not add a TurnedOff event when already off", () => {
    const trafficLight = new TrafficLight(clock);

    trafficLight.turnOff();

    expect(trafficLight.getEvents()).toHaveLength(0);
    expect(
      trafficLight.getEventsOfType(TrafficLightEventTypes.TurnedOff)
    ).toHaveLength(0);
  });

  it("should add a turnedOn event with clock currentTime", () => {
    clock.goToFuture(30);
    const trafficLight = new TrafficLight(clock);

    trafficLight.turnOn();

    expect(
      trafficLight.getEventsOfType(TrafficLightEventTypes.TurnedOn)[0].time
    ).toBe(clock.getCurrentTime());
  });

  it("should advance to green in instant 11s when turned on in instant 10s", () => {
    clock.goToFuture(10);
    const trafficLight = new TrafficLight(clock);

    trafficLight.turnOn();
    clock.tick();

    expect(trafficLight.isGreen()).toBe(true);
    expect(clock.getCurrentTime()).toBe(11);
  });
});
