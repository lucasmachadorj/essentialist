import { TrafficLights } from "./trafficLights.component";
import { Clock } from "./clock.component";

export const Transit = () => {
  return (
    <div>
      <Clock />
      <TrafficLights />
    </div>
  );
};
