import { MockInterfaces } from "../MockInterfaces";
import { DevTool } from "../DevTool";
import { Global } from "../Global";
import { State } from "../State";

describe("State", () => {
  afterEach(() => {
    MockInterfaces.restoreAllMocks();
  });

  describe("The Global State object", () => {
    it("Adds states to the global state", () => {
      const toggle = new State<boolean>("toggle", false);
      const someState = new State<{ someState: boolean }>("some-state", { someState: false });
      expect(Global.getState("toggle")).toEqual(toggle);
      expect(Global.getState("some-state")).toEqual(someState);
    });

    it("Updates state on the global state", () => {
      const toggle = new State<boolean[]>("toggle", [false]);
      const someState = new State<{ someState: boolean }>("some-state", { someState: false });
      toggle.update((state) => {
        state[0] = true;
      });
      someState.update((state) => {
        state.someState = true;
      });
      expect(Global.getState("some-state")?.state.someState).toEqual(true);
      expect(Global.getState("toggle")?.state).toEqual([true]);
    });
  });

  describe("Dev Tools", () => {
    beforeEach(() => {
      DevTool.enable();
      MockInterfaces.mockObject(console, "log");
      const toggle = new State<boolean[]>("toggle", [false]);
      toggle.update((state) => {
        state[0] = true;
      });
    });

    afterEach(() => {
      DevTool.disable();
    });

    it("Devtool logs when updating state", () => {
      const someState = new State<{ someState: boolean }>("some-state", { someState: false });
      someState.update((state) => {
        state.someState = true;
      });
      expect(console.log).toHaveBeenCalledTimes(6);
    });

    it("Devtool logs the transitioning state object", () => {
      const toggle = new State<boolean[]>("toggle", [false]);
      toggle.update((state) => {
        state[0] = true;
      });
      const [state, prevState, nextState] = (console.log as jest.Mock).mock.calls;
      expect(state).toContain("%ctoggle");
      expect(prevState).toContain("%cprevState:");
      expect(nextState).toContain("%cnextState:");
    });
  });

  describe("Subscriptions", () => {});
});
