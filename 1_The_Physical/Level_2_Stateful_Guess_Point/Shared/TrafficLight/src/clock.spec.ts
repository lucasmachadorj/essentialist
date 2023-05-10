class Clock {
  private timeDelay: number;

  constructor() {
    this.timeDelay = 0;
  }

  getTimeDelay(): number {
    return this.timeDelay;
  }

  increaseTimeDelay(timeDelay: number): void {
    this.timeDelay += timeDelay;
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

  it("should be able to increase time delay, such as add 30 s", () => {
    const clock = new Clock();
    clock.increaseTimeDelay(30);
    expect(clock.getTimeDelay()).toBe(30);
  });
});
