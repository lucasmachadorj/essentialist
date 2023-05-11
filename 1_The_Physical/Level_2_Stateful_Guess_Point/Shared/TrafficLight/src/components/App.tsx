import { clock, trafficLights } from "../core/domain";
import { Transit } from "./transit";

export function App() {
  return (
    <div>
      <Transit clock={clock} trafficLights={trafficLights} />
    </div>
  );
}
