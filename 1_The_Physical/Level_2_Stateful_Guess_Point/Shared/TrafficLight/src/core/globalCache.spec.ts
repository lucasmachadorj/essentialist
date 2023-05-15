import { Clock } from "./domain/clock";
import { GlobalCache } from "./globalCache";

describe("Global cache", () => {
  it("should add a new clock to the cache", () => {
    const cache = new GlobalCache();
    const clock = Clock.create();
    cache.saveClock(clock);
    expect(cache.getCurrentTime()).toBe(0);
  });
});
