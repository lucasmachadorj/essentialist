export class ViewModel {
  private currentTime: number = -1;

  constructor() {}

  setCurrentTime(currentTime: number) {
    this.currentTime = currentTime;
  }

  getCurrentTime(): number {
    return this.currentTime;
  }
}
