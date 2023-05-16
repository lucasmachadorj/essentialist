import { controller, presenter } from "..";
import "./newTrafficLight.css";

export const NewTrafficLight = () => {
  if (presenter.isTrafficLightLimitReached()) {
    return <div className="alert"> You cannot add more traffic lights </div>;
  }

  return (
    <button
      onClick={() => controller.addTrafficLightUseCase()}
      className="button"
    >
      Add traffic light
    </button>
  );
};
