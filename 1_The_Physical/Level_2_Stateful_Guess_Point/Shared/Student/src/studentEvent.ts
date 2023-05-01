type EventPayload = string | Object;

export abstract class StudentEvent {
  private readonly payload: string;

  constructor(payload: EventPayload, readonly type: string) {
    this.payload =
      typeof payload === "string" ? payload : JSON.stringify(payload);
  }
}

export class FirstNameUpdated extends StudentEvent {
  constructor(payload: EventPayload) {
    super(payload, "FirstNameUpdated");
  }
}

export class LastNameUpdated extends StudentEvent {
  constructor(payload: EventPayload) {
    super(payload, "LastNameUpdated");
  }
}

export class StudentCreated extends StudentEvent {
  constructor(payload: EventPayload) {
    super(payload, "StudentCreated");
  }
}
