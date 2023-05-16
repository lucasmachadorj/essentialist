import { makeAutoObservable } from "mobx";

type TimeState = number;

type TrafficLightState = {
  readonly id: string;
  readonly currentState: string;
  readonly turnedOnAt: number;
};

type ViewModelProps = {
  readonly currentTime: TimeState;
  readonly trafficLights: TrafficLightState[];
};

export class ViewModel {
  private props: ViewModelProps;

  constructor() {
    this.props = {
      currentTime: 0,
      trafficLights: [],
    };
    makeAutoObservable(this);
  }

  setCurrentTime(currentTime: number) {
    this.props = {
      ...this.props,
      currentTime: currentTime,
    };
  }

  setTrafficLights(
    trafficLights: { id: string; currentState: string; turnedOnAt: number }[]
  ) {
    this.props = {
      ...this.props,
      trafficLights: trafficLights,
    };
  }

  getCurrentTime(): number {
    return this.props.currentTime;
  }

  getTrafficLights() {
    return this.props.trafficLights;
  }

  getTrafficLight(id: string) {
    return this.trafficLights.find((t) => t.id === id);
  }

  private get trafficLights() {
    return this.props.trafficLights;
  }
}
