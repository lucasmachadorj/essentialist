import {
  TrafficLightEvent,
  TrafficLightEventTypes,
  TrafficLightEvents,
  TurnedOnEvent,
} from "./trafficLightEvent";

enum State {
  Red = "red",
  Yellow = "yellow",
  Green = "green",
  Off = "off",
  Boot = "boot",
}

type TrafficLightProps = {
  readonly currentState: State;
};

interface ITrafficLight {
  turnOn(): void;
  turnOff(): void;
  advance(): void;
  isOn(): boolean;
  isOff(): boolean;
  isBoot(): boolean;
  isGreen(): boolean;
  isYellow(): boolean;
  isRed(): boolean;
  getEvents(): TrafficLightEvent[];
  getEventsOfType(type: TrafficLightEventTypes): TrafficLightEvent[];
}

export class TrafficLight implements ITrafficLight {
  private props: TrafficLightProps;
  private events: TrafficLightEvents;

  constructor() {
    this.props = {
      currentState: State.Off,
    };
    this.events = TrafficLightEvents.create();
  }

  turnOn() {
    if (this.isOff()) this.advanceTo(State.Boot);
    this.events.add(TurnedOnEvent.create());
  }

  turnOff() {
    if (this.isOn()) this.advanceTo(State.Off);
  }

  advance() {
    if (this.isBoot()) {
      this.advanceTo(State.Green);
      return;
    }
    if (this.isGreen()) {
      this.advanceTo(State.Yellow);
      return;
    }
    if (this.isYellow()) {
      this.advanceTo(State.Red);
      return;
    }
    if (this.isRed()) {
      this.advanceTo(State.Green);
      return;
    }
  }

  isOn() {
    return this.props.currentState !== State.Off;
  }

  isOff() {
    return this.props.currentState === State.Off;
  }

  isBoot() {
    return this.props.currentState === State.Boot;
  }

  isGreen() {
    return this.props.currentState === State.Green;
  }

  isYellow() {
    return this.props.currentState === State.Yellow;
  }

  isRed() {
    return this.props.currentState === State.Red;
  }

  getEvents(): TrafficLightEvent[] {
    return this.events.getItems();
  }

  getEventsOfType(type: TrafficLightEventTypes) {
    return this.events.getItems().filter((event) => event.type === type);
  }

  private advanceTo(State: State) {
    this.props = {
      ...this.props,
      currentState: State,
    };
  }
}
