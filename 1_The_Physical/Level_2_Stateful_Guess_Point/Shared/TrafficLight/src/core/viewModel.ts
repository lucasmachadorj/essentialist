type TimeState = number;

type TrafficLightState = {
  readonly id: string;
  readonly currentState: string;
};

type ViewModelProps = {
  readonly currentTime: TimeState;
  readonly trafficLights: TrafficLightState[];
};

export class ViewModel {
  private props: ViewModelProps;

  constructor() {
    this.props = {
      currentTime: -1,
      trafficLights: [],
    };
  }

  setCurrentTime(currentTime: number) {
    this.props = {
      ...this.props,
      currentTime: currentTime,
    };
  }

  setTrafficLights(trafficLights: { id: string; currentState: string }[]) {
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
}
