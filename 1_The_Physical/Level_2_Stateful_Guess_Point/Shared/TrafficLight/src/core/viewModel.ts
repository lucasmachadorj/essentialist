export class ViewModel {
  private currentTime: number = -1;
  private trafficLights: { id: string; currentState: string }[] = [];

  constructor() {}

  setCurrentTime(currentTime: number) {
    this.currentTime = currentTime;
  }

  setTrafficLights(trafficLights: { id: string; currentState: string }[]) {
    this.trafficLights = trafficLights;
  }

  getCurrentTime(): number {
    return this.currentTime;
  }

  getTrafficLights() {
    return this.trafficLights;
  }
}
