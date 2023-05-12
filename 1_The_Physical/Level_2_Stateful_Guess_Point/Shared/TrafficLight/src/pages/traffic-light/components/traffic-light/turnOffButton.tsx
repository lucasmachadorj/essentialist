import { controller } from "../..";

export const TurnOffButton = ({ id }: { id: string }) => {
  return (
    <button onClick={() => controller.turnOffTrafficLightUseCase(id)}>
      Turn off
    </button>
  );
};
