import { Clock } from "../domain/clock";
import { Presenter } from "../presenter";
import { GlobalCache } from "./globalCache";

describe("Global cache", () => {
  it("should add a new clock to the cache", () => {
    const cache = new GlobalCache();
    const clock = Clock.create();
    cache.saveClock(clock);
    expect(cache.getClock()).toBe(clock);
  });

  it("should subscribe presenter to clock ", () => {
    const cache = new GlobalCache();
    jest.spyOn(cache, "subscribeToClock");
    new Presenter(cache);
    expect(cache.subscribeToClock).toHaveBeenCalled();
  });
});
