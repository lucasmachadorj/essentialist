import { useEffect } from "react";
import { controller, repository } from ".";
import { Clock } from "./components/clock.component";
import { observer } from "mobx-react";
import { TrafficLights } from "./components/trafficLights.component";
import { NewTrafficLight } from "./newTrafficLight.component";

export const Presenter = observer(() => {
  useEffect(() => {
    const interval = setInterval(() => {
      controller.updateClockUseCase();
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const getCurrentTime = () => repository.getCurrentTime();
  const getTrafficLights = () => repository.getTrafficLights();

  return (
    <div>
      <Clock currentTime={getCurrentTime()} />
      <NewTrafficLight />
      <TrafficLights trafficLights={getTrafficLights()} />
    </div>
  );
});
