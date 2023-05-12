import { observer } from "mobx-react";
import { TrafficLight as Light } from "../../../core/trafficLight";

export const TrafficLight = ({ trafficLight }: { trafficLight: Light }) => {
  return (
    <div>
      <div>Traffic Light </div>
      <div>state: {trafficLight.getState()}</div>
      {trafficLight.isOff() && (
        <button onClick={() => trafficLight.turnOn()}>Turn on</button>
      )}
      {trafficLight.isOn() && (
        <button onClick={() => trafficLight.turnOff()}>Turn Off</button>
      )}
    </div>
  );
};
