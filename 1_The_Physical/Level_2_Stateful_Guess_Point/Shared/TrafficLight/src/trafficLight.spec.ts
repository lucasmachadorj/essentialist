enum Status {
  Red = "red",
  Yellow = "yellow",
  Green = "green",
  Off = "off",
  On = "on",
}

type TrafficLightProps = {
  readonly currentStatus: Status;
};

class TrafficLight {
  private props: TrafficLightProps;

  constructor() {
    this.props = {
      currentStatus: Status.Off,
    };
  }

  isOff() {
    return this.props.currentStatus === Status.Off;
  }

  isOn() {
    return this.props.currentStatus === Status.On;
  }

  turnOn() {
    if (this.isOff())
      this.props = {
        currentStatus: Status.On,
      };
  }

  turnOff() {
    if (this.isOn())
      this.props = {
        currentStatus: Status.Off,
      };
  }
}

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

  it("should be able to turn off if is on", () => {
    const trafficLight = new TrafficLight();
    trafficLight.turnOn();
    trafficLight.turnOff();
    expect(trafficLight.isOff()).toBe(true);
  });
});
