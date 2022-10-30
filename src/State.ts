import { DevTool } from "./DevTool";
import { Emitter } from "./Emitter";
import { Global } from "./Global";

export class State<T> {
  private _state: T;
  public name: string;
  constructor(name: string, state: T) {
    this.name = name;
    this._state = state;
    Global.add(this.name, this);
  }

  public get state() {
    return this._state;
  }

  public update(func: (state: T) => void) {
    if (DevTool.isEnabled) {
      DevTool.onPrevState(this.name, Global.state);
      func(this._state);
      DevTool.onNextState(Global.state);
    } else {
      func(this._state);
    }
    Emitter.emit<T>(this.name, this._state);
  }

  public subscribe(func: (state: T) => void) {
    return Emitter.subscribe<T>(this.name, func);
  }

  public unsubscribe(ID: string) {
    return Emitter.unsubscribe(this.name, ID);
  }
}
