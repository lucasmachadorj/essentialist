import { Collection } from "./types";

export enum TrafficLightEventTypes {
  TurnedOn = "TurnedOn",
  TurnedOff = "TurnedOff",
  AdvancedToGreen = "AdvancedToGreen",
  AdvancedToYellow = "AdvancedToYellow",
  AdvancedToRed = "AdvancedToRed",
}

export abstract class TrafficLightEvent {
  private date: Date;

  protected constructor(public readonly type: TrafficLightEventTypes) {
    this.date = new Date();
  }
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
  private constructor() {
    super(TrafficLightEventTypes.TurnedOn);
  }

  static create() {
    return new TurnedOnEvent();
  }
}

export class TurnedOffEvent extends TrafficLightEvent {
  private constructor() {
    super(TrafficLightEventTypes.TurnedOff);
  }

  static create() {
    return new TurnedOffEvent();
  }
}

export class AdvancedToGreenEvent extends TrafficLightEvent {
  private constructor() {
    super(TrafficLightEventTypes.AdvancedToGreen);
  }

  static create() {
    return new AdvancedToGreenEvent();
  }
}

export class AdvancedToYellowEvent extends TrafficLightEvent {
  private constructor() {
    super(TrafficLightEventTypes.AdvancedToYellow);
  }

  static create() {
    return new AdvancedToYellowEvent();
  }
}

export class AdvancedToRedEvent extends TrafficLightEvent {
  private constructor() {
    super(TrafficLightEventTypes.AdvancedToRed);
  }

  static create() {
    return new AdvancedToRedEvent();
  }
}
