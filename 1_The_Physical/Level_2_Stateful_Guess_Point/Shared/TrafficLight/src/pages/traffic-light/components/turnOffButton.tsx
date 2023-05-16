import { controller } from "..";

type Props = {
  id: string;
};

export const TurnOffButton = ({ id }: Props) => {
  return (
    <button onClick={() => controller.turnOnTrafficLightUseCase(id)}>
      Turn off
    </button>
  );
};
