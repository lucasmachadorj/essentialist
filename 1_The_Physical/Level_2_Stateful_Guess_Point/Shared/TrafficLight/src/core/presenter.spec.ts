import { Controller } from "./controller";
import { GlobalCache } from "./globalCache";
import { Presenter } from "./presenter";
import { Repository } from "./repository";

describe("Presenter queries use cases", () => {
  describe("When the user opens the traffic light page", () => {
    it("should see a clock initialized with value 0", () => {
      const cache = new GlobalCache();
      const repository = new Repository(cache);
      const controller = new Controller(repository);
      const presenter = new Presenter(cache);
      controller.initializeClock();
      expect(presenter.getCurrentTime()).toBe(0);
    });

    it("should see the clock time updated", () => {
      const cache = new GlobalCache();
      const repository = new Repository(cache);
      const controller = new Controller(repository);
      const presenter = new Presenter(cache);
      controller.initializeClock();
      controller.updateClock();
      expect(presenter.getCurrentTime()).toBe(1);
    });
  });
});
