import { Indexer } from "./Indexer";

export class Emitter {
  private static subscriptions = new Map<string, Indexer<any>>();

  public static emit<T>(event: string, state: T) {
    const subscriptions = this.subscriptions.get(event);
    if (subscriptions) {
      subscriptions.execute(state);
    }
  }

  public static subscribe<T>(event: string, callback: (state: T) => void) {
    const subscriptions = this.subscriptions.get(event) || new Indexer<T>();
    const ID = subscriptions.add(callback);
    this.subscriptions.set(event, subscriptions);
    return ID;
  }

  public static unsubscribe(event: string, ID: string) {
    const subscriptions = this.subscriptions.get(event);
    if (subscriptions) {
      subscriptions.remove(ID);
      this.subscriptions.set(event, subscriptions);
    }
  }
}
