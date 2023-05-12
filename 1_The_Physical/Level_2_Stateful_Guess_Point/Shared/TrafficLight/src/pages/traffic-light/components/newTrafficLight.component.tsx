import { controller } from "..";
import "./newTrafficLight.css";

type Props = {
  size: number;
};

export const NewTrafficLight = ({ size }: Props) => {
  if (size < 5) {
    return (
      <button
        onClick={() => controller.addTrafficLightUseCase()}
        className="button"
      >
        Add traffic light
      </button>
    );
  }
  return <div className="alert"> You cannot add more traffic lights </div>;
};
