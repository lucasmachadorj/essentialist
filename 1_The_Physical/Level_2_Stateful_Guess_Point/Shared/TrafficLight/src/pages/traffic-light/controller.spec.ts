import { Controller } from "./controller";
import { Repository } from "./repository";
import { GlobalCache } from "../../core/shared/globalCache";

describe("Controller commands use cases", () => {
  describe("Given the user opens the traffic light page", () => {
    let controller: Controller;
    let repository: Repository;
    let cache: GlobalCache;

    beforeEach(() => {
      cache = new GlobalCache();
      repository = new Repository(cache);
      controller = new Controller(repository);
      controller.initializeClockUseCase();
    });

    it("should initialize a clock with value 0", () => {
      expect(repository.getCurrentTime()).toBe(0);
    });

    it("should update the clock time", () => {
      controller.updateClockUseCase();
      expect(repository.getCurrentTime()).toBe(1);
    });

    it("should add a new traffic light", () => {
      controller.addTrafficLightUseCase();
      expect(repository.getTrafficLights().length).toBe(1);
    });

    it("should turn on a traffic light", () => {
      controller.addTrafficLightUseCase();
      const trafficLight = repository.getTrafficLights()[0];
      controller.turnOnTrafficLightUseCase(trafficLight.getId());
      expect(trafficLight.getState()).toBe("boot");
    });

    it("should turn off a traffic light", () => {
      controller.addTrafficLightUseCase();
      const trafficLight = repository.getTrafficLights()[0];
      controller.turnOnTrafficLightUseCase(trafficLight.getId());
      controller.turnOffTrafficLightUseCase(trafficLight.getId());
      expect(trafficLight.getState()).toBe("off");
    });

    it("should not add more than 3 traffic lights", () => {
      controller.addTrafficLightUseCase();
      controller.addTrafficLightUseCase();
      controller.addTrafficLightUseCase();
      controller.addTrafficLightUseCase();
      expect(repository.getTrafficLights().length).toBe(3);
    });
  });
});
