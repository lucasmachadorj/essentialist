import { TrafficLight } from "./trafficLight";
import { TrafficLights } from "./trafficLights";
import { Seconds } from "./types";

type ClockProps = {
  readonly currentTime: Seconds;
  readonly subscribers: TrafficLights;
};
export class Clock {
  private props: ClockProps;

  constructor() {
    this.props = {
      currentTime: 0,
      subscribers: TrafficLights.create(),
    };
  }

  getCurrentTime(): Seconds {
    return this.props.currentTime;
  }

  goToFuture(timeDelay: Seconds): void {
    this.props = {
      ...this.props,
      currentTime: this.props.currentTime + timeDelay,
    };
  }

  subscribe(trafficLight: TrafficLight): void {
    const subscribers = this.props.subscribers;
    subscribers.add(trafficLight);

    this.props = {
      ...this.props,
      subscribers,
    };
  }

  getSubscribers(): TrafficLight[] {
    return this.props.subscribers.getItems();
  }

  tick() {
    this.goToFuture(1);
    this.props.subscribers.notifyAll();
  }
}
