import { controller } from "..";
import { TrafficLight as Traffic } from "../../../core/trafficLight";
import Circle from "./circle";
import "./trafficLight.css";

const colors = {
  off: {
    backgroundColor: "black",
  },
  booting: {
    backgroundColor: "grey",
  },
  red: {
    backgroundColor: "#cc3232",
  },
  yellow: {
    backgroundColor: "#e7b416",
  },
  green: {
    backgroundColor: "#2dc937",
  },
  grey: {
    backgroundColor: "grey",
  },
};

export const TrafficLight = ({ trafficLight }: { trafficLight: Traffic }) => {
  const renderColor = () => {
    if (trafficLight.isOff()) {
      return {
        red: colors.off,
        yellow: colors.off,
        green: colors.off,
      };
    }
    if (trafficLight.isRed()) {
      return {
        red: colors.red,
        yellow: colors.grey,
        green: colors.grey,
      };
    }
    if (trafficLight.isYellow()) {
      return {
        red: colors.grey,
        yellow: colors.yellow,
        green: colors.grey,
      };
    }
    if (trafficLight.isGreen()) {
      return {
        red: colors.grey,
        yellow: colors.grey,
        green: colors.green,
      };
    } else {
      return {
        red: colors.grey,
        yellow: colors.grey,
        green: colors.grey,
      };
    }
  };

  const { red, yellow, green } = renderColor();

  return (
    <div className="box__trafficlight">
      <div className="light">
        <Circle color={red} />
        <Circle color={yellow} />
        <Circle color={green} />
      </div>
      <div>Traffic Light </div>
      <div>state: {trafficLight.getState()}</div>
      {trafficLight.isOff() && (
        <button
          onClick={() =>
            controller.turnOnTrafficLightUseCase(trafficLight.getId())
          }
        >
          Turn on
        </button>
      )}
      {trafficLight.isOn() && (
        <button
          onClick={() =>
            controller.turnOffTrafficLightUseCase(trafficLight.getId())
          }
        >
          Turn Off
        </button>
      )}
    </div>
  );
};
