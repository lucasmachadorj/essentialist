import {
  AdvancedToGreenEvent,
  AdvancedToRedEvent,
  AdvancedToYellowEvent,
  TrafficLightEvent,
  TrafficLightEventTypes,
  TrafficLightEvents,
  TurnedOffEvent,
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

export class TrafficLight {
  private props: TrafficLightProps;
  private events: TrafficLightEvents;

  constructor() {
    this.props = {
      currentState: State.Off,
    };
    this.events = TrafficLightEvents.create();
  }

  turnOn() {
    if (this.isOff()) {
      this.advanceTo(State.Boot);
      this.events.add(TurnedOnEvent.create());
    }
  }

  turnOff() {
    if (this.isOn()) {
      this.advanceTo(State.Off);
      this.events.add(TurnedOffEvent.create());
    }
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

  private advanceTo(state: State) {
    this.props = {
      ...this.props,
      currentState: state,
    };
    this.addEvent(state);
  }

  private addEvent(state: State) {
    if (state === State.Green) {
      this.events.add(AdvancedToGreenEvent.create());
    }
    if (state === State.Yellow) {
      this.events.add(AdvancedToYellowEvent.create());
    }
    if (state === State.Red) {
      this.events.add(AdvancedToRedEvent.create());
    }
  }
}
