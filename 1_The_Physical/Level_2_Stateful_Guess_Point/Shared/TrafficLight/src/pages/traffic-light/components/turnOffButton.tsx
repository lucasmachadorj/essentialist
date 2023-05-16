import { controller } from "..";

type Props = {
  id: string;
};

export const TurnOffButton = ({ id }: Props) => {
  return (
    <button onClick={() => controller.turnOffTrafficLightUseCase(id)}>
      Turn off
    </button>
  );
};
