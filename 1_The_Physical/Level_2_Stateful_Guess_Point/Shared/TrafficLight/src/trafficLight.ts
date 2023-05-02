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

  constructor() {
    this.props = {
      currentState: State.Off,
    };
  }

  turnOn() {
    if (this.isOff()) this.advanceTo(State.Boot);
  }

  turnOff() {
    if (this.isOn()) this.advanceTo(State.Off);
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

  private advanceTo(State: State) {
    this.props = {
      ...this.props,
      currentState: State,
    };
  }
}
