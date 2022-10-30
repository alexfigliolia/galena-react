import { Indexer } from "./Indexer";

/**
 * Emitter
 *
 * The `Emitter` is the backbone for bypassing deep object
 * reconciliation in `Galena`. When a `State` interface is
 * updated, the `Emitter` will emit the update directly
 * to subscribers for that slice of `State`
 */
export class Emitter {
  private static subscriptions = new Map<string, Indexer<any>>();

  /**
   * Emit
   *
   * Executes all subscriptions for a given slice of `State`
   */
  public static emit<T>(event: string, state: T) {
    const subscriptions = this.subscriptions.get(event);
    if (subscriptions) {
      subscriptions.execute(state);
    }
  }

  /**
   * Subscribe
   *
   * Creates a new subscription for a given slice of `State`
   */
  public static subscribe<T>(event: string, callback: (state: T) => void) {
    const subscriptions = this.subscriptions.get(event) || new Indexer<T>();
    const ID = subscriptions.add(callback);
    this.subscriptions.set(event, subscriptions);
    return ID;
  }

  /**
   * Unsubscribe
   *
   * Removes an existing subscription for a given slice of `State`
   */
  public static unsubscribe(event: string, ID: string) {
    const subscriptions = this.subscriptions.get(event);
    if (subscriptions) {
      subscriptions.remove(ID);
      this.subscriptions.set(event, subscriptions);
      if (!subscriptions.size) {
        this.subscriptions.delete(event);
      }
    }
  }

  /**
   * Destroy
   *
   * Resets all open subscriptions
   */
  public static destroy() {
    this.subscriptions = new Map<string, Indexer<any>>();
  }
}
