import { Clock } from "./clock";
import { State } from "./states";
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

type TrafficLightProps = {
  readonly currentState: State;
  readonly clock: Clock;
};

export class TrafficLight {
  private props: TrafficLightProps;
  private events: TrafficLightEvents;

  constructor(clock: Clock) {
    this.props = {
      currentState: State.Off,
      clock,
    };
    this.events = TrafficLightEvents.create();
  }

  turnOn() {
    if (this.isOff()) {
      this.advanceTo(State.Boot);
      this.events.add(TurnedOnEvent.createAtTime(this.clock.getCurrentTime()));
      this.clock.subscribe(this);
    }
  }

  turnOff() {
    if (this.isOn()) {
      this.advanceTo(State.Off);
      this.events.add(TurnedOffEvent.createAtTime(this.clock.getCurrentTime()));
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

  trigger() {
    if (this.isOff()) {
      return;
    }

    if (this.isTimeTo(State.Green)) {
      this.advanceTo(State.Green);
      return;
    }
    if (this.isTimeTo(State.Yellow)) {
      this.advanceTo(State.Yellow);
      return;
    }
    if (this.isTimeTo(State.Red)) {
      this.advanceTo(State.Red);
      return;
    }
  }

  private isTimeTo = (state: State) => {
    const timeDelayCycle =
      (this.clock.getCurrentTime() - this.turnedOnTime) % 61;

    if (state === State.Green) {
      return (
        (this.isBoot() && timeDelayCycle === 1) ||
        (this.isRed() && timeDelayCycle === 0)
      );
    }
    if (state === State.Yellow) {
      return this.isGreen() && timeDelayCycle === 31;
    }
    if (state === State.Red) {
      return this.isYellow() && timeDelayCycle === 36;
    }

    return false;
  };

  private advanceTo(state: State) {
    this.props = {
      ...this.props,
      currentState: state,
    };
    this.addEvent(state);
  }

  private addEvent(state: State) {
    if (state === State.Green) {
      this.events.add(
        AdvancedToGreenEvent.createAtTime(this.clock.getCurrentTime())
      );
    }
    if (state === State.Yellow) {
      this.events.add(
        AdvancedToYellowEvent.createAtTime(this.clock.getCurrentTime())
      );
    }
    if (state === State.Red) {
      this.events.add(
        AdvancedToRedEvent.createAtTime(this.clock.getCurrentTime())
      );
    }
  }

  private get clock() {
    return this.props.clock;
  }

  private get turnedOnTime() {
    return this.getEventsOfType(TrafficLightEventTypes.TurnedOn)[0].time;
  }
}
