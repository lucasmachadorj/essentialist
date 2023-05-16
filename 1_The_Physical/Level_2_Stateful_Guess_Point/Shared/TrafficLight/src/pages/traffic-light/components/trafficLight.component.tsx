import Circle from "./circle";
import { TurnOffButton } from "./turnOffButton";
import { TurnOnButton } from "./turnOnButton";
import "./trafficLight.css";
import { renderColor } from "../utils";
import { State } from "../../../core/domain/states";

type Props = {
  id: string;
  currentState: string;
  turnedOnAt: number | null;
};

export const TrafficLight = ({ id, currentState, turnedOnAt }: Props) => {
  const { red, yellow, green } = renderColor(currentState);

  const onOffButton = () => {
    if (currentState === State.Off) {
      return <TurnOnButton {...{ id }} />;
    }
    return <TurnOffButton {...{ id }} />;
  };

  const startTime = () => {
    if (turnedOnAt) {
      return turnedOnAt % 60;
    }
    return "not started yet";
  };

  return (
    <div className="box__trafficlight">
      <div className="light">
        <Circle color={red} />
        <Circle color={yellow} />
        <Circle color={green} />
      </div>
      <div>Traffic Light </div>
      <div>state: {currentState}</div>
      <div>started at: {startTime()} </div>
      <div className="button__container">{onOffButton()}</div>
    </div>
  );
};
