import { controller } from "..";

export const TurnOnButton = ({ id }: { id: string }) => {
  return (
    <button onClick={() => controller.turnOnTrafficLightUseCase(id)}>
      Turn on
    </button>
  );
};
