import { Clock } from "./clock";
import { TrafficLight } from "./trafficLight";

const clock = new Clock();

const trafficLights: Record<string, TrafficLight> = {
  A: new TrafficLight(clock),
  B: new TrafficLight(clock),
  C: new TrafficLight(clock),
};

export { clock, trafficLights };
