import { observer } from "mobx-react";
import { TrafficLight as Light } from "../core/domain/trafficLight";

export const TrafficLight = observer(
  ({ trafficLight, name }: { trafficLight: Light; name: string }) => {
    return (
      <div>
        <div>Traffic Light {name}</div>
        <div>state: {trafficLight.getState()}</div>
        {trafficLight.isOff() && (
          <button onClick={() => trafficLight.turnOn()}>Turn on</button>
        )}
        {trafficLight.isOn() && (
          <button onClick={() => trafficLight.turnOff()}>Turn Off</button>
        )}
      </div>
    );
  }
);
