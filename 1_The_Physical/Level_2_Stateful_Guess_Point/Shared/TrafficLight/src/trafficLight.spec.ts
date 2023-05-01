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
}

describe("TrafficLight", () => {
  it("should be defined", () => {
    expect(TrafficLight).toBeDefined();
  });

  it("should start off", () => {
    const trafficLight = new TrafficLight();
    expect(trafficLight.isOff()).toBe(true);
  });
});
