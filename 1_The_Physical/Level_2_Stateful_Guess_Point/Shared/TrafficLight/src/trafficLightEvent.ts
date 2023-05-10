import { Collection } from "./types";

export enum TrafficLightEventTypes {
  TurnedOn = "TurnedOn",
  TurnedOff = "TurnedOff",
  AdvancedToGreen = "AdvancedToGreen",
  AdvancedToYellow = "AdvancedToYellow",
  AdvancedToRed = "AdvancedToRed",
}

export class TrafficLightEvent {
  protected constructor(
    public readonly type: TrafficLightEventTypes,
    public readonly time: number
  ) {}
}

export class TrafficLightEvents implements Collection<TrafficLightEvent> {
  private events: TrafficLightEvent[] = [];

  private constructor() {}

  static create() {
    return new TrafficLightEvents();
  }

  add(event: TrafficLightEvent) {
    this.events.push(event);
  }

  getItems(): TrafficLightEvent[] {
    return this.events;
  }

  count() {
    return this.events.length;
  }
}

export class TurnedOnEvent extends TrafficLightEvent {
  private constructor(time: number) {
    super(TrafficLightEventTypes.TurnedOn, time);
  }

  static create(time: number) {
    return new TurnedOnEvent(time);
  }
}

export class TurnedOffEvent extends TrafficLightEvent {
  private constructor(time: number) {
    super(TrafficLightEventTypes.TurnedOff, time);
  }

  static create(time: number) {
    return new TurnedOffEvent(time);
  }
}

export class AdvancedToGreenEvent extends TrafficLightEvent {
  private constructor(time: number) {
    super(TrafficLightEventTypes.AdvancedToGreen, time);
  }

  static create(time: number) {
    return new AdvancedToGreenEvent(time);
  }
}

export class AdvancedToYellowEvent extends TrafficLightEvent {
  private constructor(time: number) {
    super(TrafficLightEventTypes.AdvancedToYellow, time);
  }

  static create(time: number) {
    return new AdvancedToYellowEvent(time);
  }
}

export class AdvancedToRedEvent extends TrafficLightEvent {
  private constructor(time: number) {
    super(TrafficLightEventTypes.AdvancedToRed, time);
  }

  static create(time: number) {
    return new AdvancedToRedEvent(time);
  }
}
