import { TrafficLight } from "./trafficLight.component";
import "./trafficLights.css";

type Props = {
  id: string;
  currentState: string;
  turnedOnAt: number | null;
};

export const TrafficLights = ({
  trafficLightProps,
}: {
  trafficLightProps: Props[];
}) => {
  return (
    <div className="box">
      <div>Traffic lights</div>
      <div className="items">
        {trafficLightProps.map((trafficLightProp, index) => {
          return <TrafficLight {...trafficLightProp} key={index} />;
        })}
      </div>
    </div>
  );
};
