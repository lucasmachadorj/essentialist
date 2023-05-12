import { controller } from ".";

export const NewTrafficLight = () => {
  return (
    <div>
      <button onClick={() => controller.addTrafficLightUseCase()}>
        Add traffic light
      </button>
    </div>
  );
};
