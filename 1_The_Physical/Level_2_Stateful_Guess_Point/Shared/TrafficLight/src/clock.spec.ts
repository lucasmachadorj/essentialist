class Clock {
  private timeDelay: number;

  constructor() {
    this.timeDelay = 0;
  }

  getTimeDelay(): number {
    return this.timeDelay;
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
});
