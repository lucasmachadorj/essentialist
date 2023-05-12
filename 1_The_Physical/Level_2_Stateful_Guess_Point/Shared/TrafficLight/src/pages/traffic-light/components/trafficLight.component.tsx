import { TrafficLight as Traffic } from "../../../domain/trafficLight";
import { renderColor } from "../utils";
import Circle from "./circle";
import { TurnOffButton } from "./turnOffButton";
import { TurnOnButton } from "./turnOnButton";
import "./trafficLight.css";

type Props = {
  trafficLight: Traffic;
};

export const TrafficLight = ({ trafficLight }: Props) => {
  const { red, yellow, green } = renderColor(trafficLight);

  const onOffButton = () => {
    if (trafficLight.isOff()) {
      return <TurnOnButton id={trafficLight.getId()} />;
    }
    return <TurnOffButton id={trafficLight.getId()} />;
  };

  return (
    <div className="box__trafficlight">
      <div className="light">
        <Circle color={red} />
        <Circle color={yellow} />
        <Circle color={green} />
      </div>
      <div>Traffic Light </div>
      <div>state: {trafficLight.getState()}</div>
      {onOffButton()}
    </div>
  );
};
