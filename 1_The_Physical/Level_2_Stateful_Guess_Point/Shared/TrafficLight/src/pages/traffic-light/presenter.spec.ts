import { GlobalCache } from "../../core/shared/globalCache";
import { Controller } from "./controller";
import { Presenter } from "./presenter";
import { Repository } from "./repository";

const updateTime = (n: number) => (controller: Controller) =>
  [...Array(n)].forEach(() => controller.updateClockUseCase());

const updateTime10 = updateTime(10);

describe("Presenter queries use cases", () => {
  describe("When the user opens the traffic light page", () => {
    let cache: GlobalCache;
    let repository: Repository;
    let controller: Controller;
    let presenter: Presenter;

    beforeEach(() => {
      cache = new GlobalCache();
      repository = new Repository(cache);
      controller = new Controller(repository);
      presenter = new Presenter(cache);
      controller.initializeClockUseCase();
    });

    it("should see a clock initialized with value 0", () => {
      expect(presenter.getCurrentTime()).toBe(0);
    });

    it("should see the clock time updating", () => {
      controller.updateClockUseCase();
      expect(presenter.getCurrentTime()).toBe(1);
    });

    it("should see a new traffic light", () => {
      controller.addTrafficLightUseCase();
      expect(presenter.getTrafficLights().length).toBe(1);
    });

    it("should see a traffic light turns green", () => {
      controller.addTrafficLightUseCase();
      const { id } = presenter.getTrafficLights()[0];
      controller.turnOnTrafficLightUseCase(id);
      updateTime10(controller);
      const trafficLight = presenter.getTrafficLight(id);
      expect(trafficLight?.currentState).toBe("green");
    });

    it("should check if the limit of 3 traffic lights is reached", () => {
      controller.addTrafficLightUseCase();
      controller.addTrafficLightUseCase();
      controller.addTrafficLightUseCase();
      expect(presenter.isTrafficLightLimitReached()).toBe(true);
    });
  });
});
