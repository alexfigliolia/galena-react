import { AutoIncrementingID } from "./AutoIncrementingID";

export class Indexer<T> {
  private incrementor = new AutoIncrementingID();
  private subscriptions = new Map<string, (state: any) => void>();

  public add(callback: (state: any) => void) {
    const ID = this.incrementor.nextID;
    this.subscriptions.set(ID, callback);
    return ID;
  }

  public remove(key: string) {
    this.subscriptions.delete(key);
  }

  public execute(state: T) {
    const subscriptions = this.subscriptions.values();
    for (const sub of subscriptions) {
      sub(state);
    }
  }
}
