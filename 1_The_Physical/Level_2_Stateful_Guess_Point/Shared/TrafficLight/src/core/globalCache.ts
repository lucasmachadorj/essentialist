import { Clock } from "./domain/clock";
import { Presenter } from "./presenter";

type TrafficLightState = {
  readonly id: string;
  readonly currentState: string;
};

type CacheProps = {
  readonly clock: Clock | null;
  readonly trafficLights: TrafficLightState[];
  readonly listeners: Record<string, Presenter[]>;
};
export class GlobalCache {
  private props: CacheProps;

  constructor() {
    this.props = {
      clock: null,
      trafficLights: [],
      listeners: {},
    };
  }

  private get clock(): Clock | null {
    return this.props.clock;
  }

  getClock(): Clock | null {
    return this.props.clock;
  }

  saveClock(clock: Clock) {
    this.props = {
      ...this.props,
      clock: clock,
    };
    this.propagateClock();
  }

  subscribeToClock(presenter: Presenter) {
    this.props = {
      ...this.props,
      listeners: {
        ...this.props.listeners,
        clock: [...(this.props.listeners["clock"] || []), presenter],
      },
    };
  }

  subscribeToTrafficLights(presenter: Presenter) {
    this.props = {
      ...this.props,
      listeners: {
        ...this.props.listeners,
        trafficLights: [
          ...(this.props.listeners["trafficLights"] || []),
          presenter,
        ],
      },
    };
  }

  addTrafficLight(trafficLight: TrafficLightState) {
    this.props = {
      ...this.props,
      trafficLights: [...this.props.trafficLights, trafficLight],
    };
    this.propagateTrafficLights();
  }

  getTrafficLights() {
    return this.props.trafficLights;
  }

  private propagateClock() {
    if (!this.clock) return;

    this.props.listeners["clock"]?.forEach((listener) =>
      listener.updateClock(this.clock!.getCurrentTime())
    );
  }

  private propagateTrafficLights() {
    this.props.listeners["trafficLights"]?.forEach((listener) =>
      listener.updateTrafficLights(this.props.trafficLights)
    );
  }
}
