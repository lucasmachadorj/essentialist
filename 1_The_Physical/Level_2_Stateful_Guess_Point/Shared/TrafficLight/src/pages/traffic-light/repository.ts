import { TrafficLight } from "../../core/trafficLight";
import { Clock } from "../../core/clock";

export class Repository {
  private trafficLights: TrafficLight[];

  private constructor(private clock: Clock) {
    this.trafficLights = [];
  }

  static create(clock: Clock): Repository {
    return new Repository(clock);
  }

  public getCurrentTime(): number {
    return this.clock.getCurrentTime();
  }

  public updateClock(): void {
    this.clock.tick();
  }

  public addTrafficLight(): void {
    const trafficLight = new TrafficLight(this.clock);
    this.trafficLights.push(trafficLight);
  }

  public getTrafficLights(): TrafficLight[] {
    return this.trafficLights;
  }
}
