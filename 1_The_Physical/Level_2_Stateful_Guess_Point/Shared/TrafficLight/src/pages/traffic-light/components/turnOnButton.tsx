import { controller } from "..";

type Props = {
  id: string;
};

export const TurnOnButton = ({ id }: Props) => {
  return (
    <button onClick={() => controller.turnOnTrafficLightUseCase(id)}>
      Turn on
    </button>
  );
};
