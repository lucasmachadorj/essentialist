import { Presenter } from "../../pages/traffic-light/presenter";
import { Clock } from "../domain/clock";
import { TrafficLight } from "../domain/trafficLight";

type CacheProps = {
  readonly clock: Clock | null;
  readonly trafficLights: TrafficLight[];
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
    this.propagateTrafficLights();
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

  addTrafficLight(trafficLight: TrafficLight) {
    this.props = {
      ...this.props,
      trafficLights: [...this.props.trafficLights, trafficLight],
    };
    this.propagateTrafficLights();
  }

  getTrafficLights() {
    return this.props.trafficLights;
  }

  getTrafficLight(id: string) {
    return this.props.trafficLights.find((tl) => tl.getId() === id);
  }

  updateTrafficLight(trafficLight: TrafficLight) {
    this.props = {
      ...this.props,
      trafficLights: this.props.trafficLights.map((tl) =>
        tl.getId() === trafficLight.getId() ? trafficLight : tl
      ),
    };
    this.propagateTrafficLights();
  }

  private propagateClock() {
    if (!this.clock) return;

    this.listeners["clock"]?.forEach((listener) =>
      listener.updateClock(this.clock!.getCurrentTime())
    );
  }

  private propagateTrafficLights() {
    const trafficLightProps = this.trafficLights.map((tl) => ({
      id: tl.getId(),
      currentState: tl.getState(),
    }));

    this.listeners["trafficLights"]?.forEach((listener) => {
      listener.updateTrafficLights(trafficLightProps);
    });
  }

  private get trafficLights(): TrafficLight[] {
    return this.props.trafficLights;
  }

  private get listeners(): Record<string, Presenter[]> {
    return this.props.listeners;
  }
}
