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

  advance() {
    if (this.isBoot()) {
      this.advanceTo(Status.Green);
      return;
    }
    if (this.isGreen()) {
      this.advanceTo(Status.Yellow);
      return;
    }
    if (this.isYellow()) {
      this.advanceTo(Status.Red);
      return;
    }
    if (this.isRed()) {
      this.advanceTo(Status.Green);
      return;
    }
  }

  isBoot() {
    return this.props.currentStatus === Status.Boot;
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

  private advanceTo(status: Status) {
    this.props = {
      currentStatus: status,
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
});
