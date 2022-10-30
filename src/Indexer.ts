import { AutoIncrementingID } from "./AutoIncrementingID";

/**
 * Indexer
 *
 * A mechanism for indexing a given slice of `State`'s subscriptions
 */
export class Indexer<T> {
  private incrementor = new AutoIncrementingID();
  private subscriptions = new Map<string, (state: any) => void>();

  /**
   * Size
   *
   * Returns the number of subscriptions on the indexer
   */
  get size() {
    return this.subscriptions.size;
  }

  /**
   * Add
   *
   * Adds a subscriptions to the indexer
   */
  public add(callback: (state: any) => void) {
    const ID = this.incrementor.nextID;
    this.subscriptions.set(ID, callback);
    return ID;
  }

  /**
   * Remove
   *
   * Removes a subscriptions to the indexer
   */
  public remove(key: string) {
    this.subscriptions.delete(key);
  }

  /**
   * Execute
   *
   * Executes all subscriptions present
   */
  public execute(state: T) {
    const subscriptions = this.subscriptions.values();
    for (const sub of subscriptions) {
      sub(state);
    }
  }
}
