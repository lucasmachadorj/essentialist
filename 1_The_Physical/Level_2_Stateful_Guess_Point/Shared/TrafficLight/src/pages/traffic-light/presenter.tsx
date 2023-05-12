import { useEffect } from "react";
import { controller, repository } from ".";
import { Clock } from "./components/clock.component";
import { observer } from "mobx-react";
import { TrafficLights } from "./components/trafficLights.component";
import { NewTrafficLight } from "./components/newTrafficLight.component";

import "./presenter.css";

export const Presenter = observer(() => {
  useEffect(() => {
    const interval = updateClockEach(100);
    return () => clearInterval(interval);
  }, []);

  const getCurrentTime = () => repository.getCurrentTime();
  const getTrafficLights = () => repository.getTrafficLights();

  const updateClockEach = (delay: number) => {
    return setInterval(() => {
      controller.updateClockUseCase();
    }, delay);
  };

  return (
    <div className="container">
      <NewTrafficLight />
      <Clock currentTime={getCurrentTime()} />
      <TrafficLights trafficLights={getTrafficLights()} />
    </div>
  );
});
