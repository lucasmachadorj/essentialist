import { Controller } from "./controller";
import { GlobalCache } from "./globalCache";
import { Repository } from "./repository";

describe("Controller commands use cases", () => {
  describe("Given the user opens the traffic light page", () => {
    it("should initialize a clock with value 0", () => {
      const cache = new GlobalCache();
      const repository = new Repository(cache);
      const controller = new Controller(repository);
      controller.initializeClock();
      expect(repository.getCurrentTime()).toBe(0);
    });
  });
});
