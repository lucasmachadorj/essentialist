import { TrafficLight as Traffic } from "../../../domain/trafficLight";
import { renderColor } from "../utils";
import Circle from "./circle";
import { TurnOffButton } from "./turnOffButton";
import { TurnOnButton } from "./turnOnButton";
import "./trafficLight.css";
import { State } from "../../../domain/states";

type Props = {
  id: string;
  state: State;
  turnedOnAt: number | null;
};

export const TrafficLight = ({ id, state, turnedOnAt }: Props) => {
  const { red, yellow, green } = renderColor(state);

  const onOffButton = () => {
    if (state === State.Off) {
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
      <div>state: {state}</div>
      <div>started at: {startTime()} </div>
      <div className="button__container">{onOffButton()}</div>
    </div>
  );
};
