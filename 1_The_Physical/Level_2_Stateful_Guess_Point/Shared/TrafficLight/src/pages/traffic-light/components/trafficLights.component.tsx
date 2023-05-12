import { TrafficLight } from "../../../domain/trafficLight";
import { TrafficLight as TrafficLightUI } from "./trafficLight.component";
import "./trafficLights.css";

type Props = {
  trafficLights: TrafficLight[];
};

export const TrafficLights = ({ trafficLights }: Props) => {
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
