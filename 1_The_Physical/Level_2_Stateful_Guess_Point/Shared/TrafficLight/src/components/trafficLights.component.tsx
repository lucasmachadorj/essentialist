import { trafficLights } from "../core/domain";
import { TrafficLight } from "./trafficLight.component";

export const TrafficLights = () => {
  return (
    <div>
      <div>Traffic lights</div>
      <div style={{ display: "flex", flexDirection: "row", gap: 30 }}>
        {Object.keys(trafficLights).map((name, index) => {
          return (
            <TrafficLight
              trafficLight={trafficLights[name]}
              name={name}
              key={index}
            />
          );
        })}
      </div>
    </div>
  );
};
