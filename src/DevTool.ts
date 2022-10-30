/**
 * Dev Tool
 *
 * Enables logging and performance profiling for state transitions
 * without the need for 3rd party middleware
 */
export class DevTool {
  private static logging = false;
  private static performance = false;
  private static updateMetrics = new Map<string, number>();

  /**
   * Enable Logging
   *
   * Enables logging state transitions between updates. Your console will
   * contain an entry for each transition, the previous and the next state
   * values
   */
  public static enableLogging() {
    this.logging = true;
  }

  /**
   * Disables Logging
   *
   * Disables logging state transitions between updates
   */
  public static disableLogging() {
    this.logging = false;
  }

  /**
   * Enable Performance
   *
   * Enables performance profiling for state transitions. Each transitions will
   * come with precise measurements as well as warnings for state transitions
   * taking more than 16 milliseconds
   */
  public static enablePerformance() {
    this.performance = true;
  }

  /**
   * Disable Performance
   *
   * Disables performance profiling for state transitions
   */
  public static disablePerformance() {
    this.performance = false;
  }

  /**
   * Is Enabled
   *
   * Returns whether either of the DevTool's utilities are enabled
   */
  public static get isEnabled() {
    return this.logging || this.performance;
  }

  /**
   * On Prev State
   *
   * An event emitted before any state transition when the `DevTool`
   * is enabled. It'll log and/or record a transition start time
   * for the update
   */
  public static onPrevState<T>(name: string, prevState: T, ID: string) {
    if (this.logging) {
      console.log(`%c${name}`, "color: #9a9a9a; padding: 1px; font-weight: 800", "- state transition:", "\n");
      console.log(
        `%cprevState:`,
        "color: #47c3aa; padding: 1px; margin-left: 10px; font-weight: 800",
        prevState,
        "\n"
      );
    }
    if (this.performance) {
      this.updateMetrics.set(ID, performance.now());
    }
  }

  /**
   * On Next State
   *
   * An event emitted after any state transition completes. When
   * the `DevTool` is enabled. It'll log and/or profile a state
   * transition duration for each update
   */
  public static onNextState<T>(name: string, nextState: T, ID: string) {
    if (this.logging) {
      console.log(
        `%cnextState:`,
        "color: #109cc3; padding: 1px; margin-left: 10px; font-weight: 800",
        nextState,
        "\n"
      );
    }
    const transitionStart = this.updateMetrics.get(ID);
    if (this.performance && typeof transitionStart === "number") {
      const updateDuration = performance.now() - transitionStart;
      console.log(
        `%c${name} - Transition Duration:`,
        "color: #0cb34c; padding: 1px; margin-left: 10px; font-weight: 800",
        `${updateDuration} milliseconds`,
        "\n"
      );
      if (updateDuration > 16) {
        console.log(
          "%cWarning:",
          "color: #ff9f38; padding: 1px; margin-left: 10px; font-weight: 800",
          "State transitions taking more than 16 milliseconds can lead to bottlenecks within your UI. Consider reducing the overhead by leveraging microtasks or improvements to time and space",
          "\n"
        );
      }
    }
  }
}
