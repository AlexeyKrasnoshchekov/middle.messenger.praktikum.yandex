type EventList = Record<string | number | symbol, unknown[]>;

class EventBus<Events extends EventList = EventList> {
  private readonly listeners = {} as { [K in keyof Events]?: Array<(...args: Events[K]) => void>; };

  public on<K extends keyof Events>(event: K, callback: (...args: any) => void): void {
    const events = this.listeners[event] ?? [];
    events.push(callback);
    this.listeners[event] = events;
  }

  public off<K extends keyof Events>(event: K, callback: (...args: Events[K]) => void): void {
    // eslint-disable-next-line max-len
    this.listeners[event] = this.listeners[event]?.filter((listener) => listener !== callback) ?? [];
  }

  public emit<K extends keyof Events>(event: K, ...args: Events[K]): void {
    this.listeners[event]?.forEach((listener) => listener(...args));
  }
}

export default EventBus;
