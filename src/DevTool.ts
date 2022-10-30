export class DevTool {
  private static enabled = false;

  public static enable() {
    this.enabled = true;
  }

  public static disable() {
    this.enabled = false;
  }

  public static get isEnabled() {
    return this.enabled;
  }

  public static onPrevState<T>(name: string, prevState: T) {
    console.log(`%c${name}`, "color: #9a9a9a; padding: 1px; font-weight: 800", "- state transition:", "\n");
    console.log(
      `%cprevState:`,
      "color: #47c3aa; padding: 1px; margin-left: 10px; font-weight: 800",
      prevState,
      "\n"
    );
  }

  public static onNextState<T>(nextState: T) {
    console.log(
      `%cnextState:`,
      "color: #109cc3; padding: 1px; margin-left: 10px; font-weight: 800",
      nextState,
      "\n"
    );
  }
}
