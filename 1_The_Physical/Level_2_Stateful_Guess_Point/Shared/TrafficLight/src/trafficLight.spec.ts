enum Status {
  Red = "red",
  Yellow = "yellow",
  Green = "green",
  Off = "off",
  On = "on",
}

type TrafficLightProps = {
  currentStatus: Status;
};

class TrafficLight {
  private readonly currentStatus: Status = Status.Off;
  constructor() {}

  isOff() {
    return this.currentStatus === Status.Off;
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
