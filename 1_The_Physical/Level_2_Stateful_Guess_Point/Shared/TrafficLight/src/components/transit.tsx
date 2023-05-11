import { observer } from "mobx-react";
import { useEffect } from "react";
import { Clock } from "../core/domain/clock";
import { TrafficLight } from "../core/domain/trafficLight";

export const Transit = observer(
  ({
    clock,
    trafficLights,
  }: {
    clock: Clock;
    trafficLights: Record<string, TrafficLight>;
  }) => {
    useEffect(() => {
      const interval = setInterval(() => {
        clock.tick();
      }, 100);
      return () => clearInterval(interval);
    }, []);

    return (
      <div>
        <div>Clock time: {clock.getCurrentTime()} s</div>
        <div>Cycles: {Math.floor(clock.getCurrentTime() / 60)} </div>
        <div>
          <div style={{ marginTop: 10 }}>Traffic lights</div>
          <div style={{ display: "flex", flexDirection: "row", gap: 30 }}>
            {Object.keys(trafficLights).map((id) => {
              const trafficLight = trafficLights[id];
              return (
                <div key={id}>
                  <div>Traffic Light {id}</div>
                  <div>state: {trafficLight.getState()}</div>
                  {trafficLight.isOff() && (
                    <button onClick={() => trafficLight.turnOn()}>
                      Turn on
                    </button>
                  )}
                  {trafficLight.isOn() && (
                    <button onClick={() => trafficLight.turnOff()}>
                      Turn Off
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
);
