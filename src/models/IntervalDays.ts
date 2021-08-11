import { addDays, format } from "date-fns";
import { MomentEvent } from "./MomentEvent";
import { Day } from "./Day";

class IntervalDays {
  public readonly start: Date;

  public readonly end: Date;

  public days: Record<string, Day> = {};

  constructor(start: Date, end: Date) {
    this.start = start;

    this.end = end;

    let d = this.start;
    while (d <= this.end) {
      const key = format(d, "yyyy-MM-dd");

      this.days[key] = new Day(d);

      d = addDays(d, 1);
    }
  }

  get momentEvents(): MomentEvent[] {
    return Object.values(this.days)
      .map(({ momentEvents }) => momentEvents)
      .flat();
  }

  get quant(): number {
    return this.momentEvents.reduce((r, { quant }) => r + quant, 0);
  }

  addMomentEvents(data: [string, number][]): void {
    const momentEvents = data.map(
      ([date, data]) => new MomentEvent(new Date(date), data)
    );

    for (let event of momentEvents) {
      const key = format(event.date, "yyyy-MM-dd");

      this.days[key].add(event);
    }
  }
}

export { IntervalDays };
