import { useEffect } from "react";
import { observer } from "mobx-react";

import { controller, presenter } from "..";

import { NewTrafficLight } from "./newTrafficLight.component";
import { Clock } from "./clock.component";
import { TrafficLights } from "./trafficLights.component";

import "./container.css";

export const Container = observer(() => {
  useEffect(() => {
    controller.initializeClockUseCase();
    const interval = updateClockEach(100);
    return () => clearInterval(interval);
  }, []);

  const updateClockEach = (delay: number) => {
    return setInterval(() => {
      controller.updateClockUseCase();
    }, delay);
  };

  return (
    <div className="container">
      <NewTrafficLight />
      <Clock currentTime={presenter.getCurrentTime()} />
      <TrafficLights trafficLightProps={presenter.getTrafficLights()} />
    </div>
  );
});
