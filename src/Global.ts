import type { State } from "./State";
import type { GlobalIndex } from "./types";
import { AutoIncrementingID } from "./AutoIncrementingID";

export class Global {
  private static _state = new Map<string, State<any>>();
  private static incrementor = new AutoIncrementingID();
  private static subscriptions = new Map<string, GlobalIndex[]>();

  public static get state() {
    return this._state;
  }

  public static getState(key: string) {
    return this._state.get(key);
  }

  public static add<T>(key: string, state: State<T>) {
    this._state.set(key, state);
  }

  public static subscribe(func: (state: Map<string, State<any>>) => void) {
    const ID = this.incrementor.nextID;
    const IDs: { name: string; ID: string }[] = [];
    for (const [name, State] of this._state) {
      IDs.push({
        name,
        ID: State.subscribe(() => {
          func(this._state);
        }),
      });
    }
    this.subscriptions.set(ID, IDs);
    return ID;
  }

  public static unsubscribe(ID: string) {
    const IDs = this.subscriptions.get(ID) || [];
    IDs.forEach(({ name, ID }) => {
      const state = this.getState(name);
      if (state) {
        state.unsubscribe(ID);
      }
    });
  }
}
