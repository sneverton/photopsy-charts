class MomentEvent {
  constructor(public readonly date: Date, public readonly quant: number) {}

  get day(): number {
    return this.date.getDate();
  }

  get month(): number {
    return this.date.getMonth();
  }
}

export { MomentEvent };
