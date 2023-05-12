import { TrafficLight } from "../../../core/trafficLight";
import { TrafficLight as TrafficLightUI } from "./trafficLight.component";
import "./trafficLights.css";

export const TrafficLights = ({
  trafficLights,
}: {
  trafficLights: TrafficLight[];
}) => {
  return (
    <div className="box">
      <div>Traffic lights</div>
      <div className="items">
        {trafficLights.map((trafficLight, index) => {
          return <TrafficLightUI trafficLight={trafficLight} key={index} />;
        })}
      </div>
    </div>
  );
};
