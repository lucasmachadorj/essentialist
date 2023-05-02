import { Collection } from "./types";

export abstract class TrafficLightEvent {
  private date: Date;
  protected constructor() {
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

  getItems() {
    return this.events;
  }

  count() {
    return this.events.length;
  }
}

export class TurnedOnEvent extends TrafficLightEvent {
  private constructor() {
    super();
  }

  static create() {
    return new TurnedOnEvent();
  }
}
