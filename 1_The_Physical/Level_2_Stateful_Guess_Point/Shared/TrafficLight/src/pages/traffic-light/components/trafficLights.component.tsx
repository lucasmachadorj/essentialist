import { TrafficLight } from "../../../core/trafficLight";
import { TrafficLight as TrafficLightUI } from "./trafficLight.component";

export const TrafficLights = ({
  trafficLights,
}: {
  trafficLights: TrafficLight[];
}) => {
  return (
    <div>
      <div>Traffic lights</div>
      <div style={{ display: "flex", flexDirection: "row", gap: 30 }}>
        {trafficLights.map((trafficLight, index) => {
          return <TrafficLightUI trafficLight={trafficLight} key={index} />;
        })}
      </div>
    </div>
  );
};
