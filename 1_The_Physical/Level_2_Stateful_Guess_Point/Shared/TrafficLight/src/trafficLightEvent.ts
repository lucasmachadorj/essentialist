import { Collection } from "./types";

export class TrafficLightEvent {
  private date: Date;
  constructor() {
    this.date = new Date();
  }
}

export class TrafficLightEvents implements Collection<TrafficLightEvent> {
  private events: TrafficLightEvent[] = [];

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
  constructor() {
    super();
  }
}
