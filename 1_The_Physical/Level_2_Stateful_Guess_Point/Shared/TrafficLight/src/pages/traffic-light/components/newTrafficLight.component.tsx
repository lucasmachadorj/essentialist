import { controller } from "..";
import "./newTrafficLight.css";

export const NewTrafficLight = () => {
  return (
    <button
      onClick={() => controller.addTrafficLightUseCase()}
      className="button"
    >
      Add traffic light
    </button>
  );
};
