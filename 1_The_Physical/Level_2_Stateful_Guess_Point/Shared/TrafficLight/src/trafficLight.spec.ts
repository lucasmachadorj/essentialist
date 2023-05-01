enum Status {
  Red = "red",
  Yellow = "yellow",
  Green = "green",
  Off = "off",
  Boot = "boot",
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
    return this.props.currentStatus !== Status.Off;
  }

  turnOn() {
    if (this.isOff())
      this.props = {
        currentStatus: Status.Boot,
      };
  }

  turnOff() {
    if (this.isOn())
      this.props = {
        currentStatus: Status.Off,
      };
  }

  isBoot() {
    return this.props.currentStatus === Status.Boot;
  }

  advance() {
    if (this.isBoot()) {
      this.props = {
        currentStatus: Status.Green,
      };
      return;
    }
    if (this.isGreen()) {
      this.props = {
        currentStatus: Status.Yellow,
      };
      return;
    }
    if (this.isYellow()) {
      this.props = {
        currentStatus: Status.Red,
      };
      return;
    }
  }

  isGreen() {
    return this.props.currentStatus === Status.Green;
  }

  isYellow() {
    return this.props.currentStatus === Status.Yellow;
  }

  isRed() {
    return this.props.currentStatus === Status.Red;
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
});
