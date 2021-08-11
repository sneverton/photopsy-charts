import { MomentEvent } from "./MomentEvent";

class Day {
  public readonly hours: MomentEvent[][];

  constructor(public readonly date: Date) {
    this.hours = Array.from({ length: 24 }, () => []);
  }

  get quant(): number {
    return this.momentEvents.reduce((r, { quant }) => r + quant, 0);
  }

  get momentEvents(): MomentEvent[] {
    return this.hours.flat();
  }

  add(event: MomentEvent): void {
    this.hours[event.date.getHours()].push(event);
  }
}

export { Day };
