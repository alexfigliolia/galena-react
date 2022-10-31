# Galena React

React bindings for [Galena](https://www.npmjs.com/package/galena)!

#### Getting Started

```bash
npm i -S galena galena-react
# or
yarn add galena galena-react
```

#### Creating State Fragments

If you're already familiar with Galena, you can skip this part. Below, we are going to set up a really basic fragment of our application state under the alias `my-state`

```TypeScript
import { State } from 'galena';

export class MyState extends State<IMyState> {
  constructor() {
    super("my-state", {
      toggle: true,
      authenticated: false,
      username: ""
      // ... any state keys you require
    });
  }

  setUsername(username: string) {
    this.update((state: IMyState) => {
      state.username = username;
    });
  }

  async getUserName() {
    const response = await fetch("api/username");
    this.setUsername(await response.text());
  }
}
```

#### Subscribing to State in your Components:

Next, let's use `my-state` values inside of our JSX:

```TypeScript
import { useGalenaState } from 'galena-react';

const MyComponent = (props) => {
  const state = useGalenaState("my-state", (state) => state);
  /*
    {
      toggle: true,
      authenticated: false,
      username: ""
    }
  */

  // ... Your JSX
}
```

#### Updating State in your Components using MyState:

Let's use a basic input element to set values on the `my-state` fragment:

```TSX
import { MyState } from './MyState';

const MyComponent = (props) => {

  const setUserName = (username: string) = {
    MyState.setUserName(username);
  }

  return (
    <input onChange={setUserName}>
  );
}
```

#### Updating State in your Components using Empire:

Let's do the same operation, but this time, without importing our State instance:

```TSX
import { Empire } from 'galena';

const MyComponent = (props) => {

  const setUserName = (username: string) = {
    Empire.getState("my-state").setUserName(username);
  }

  return (
    <input onChange={setUserName}>
  );
}
```

#### Creating Contexts from Galena State

This library offers up a utility for easily using your Galena states in the form of more familiar React Contexts:

```TSX
import { ContextFactory } from 'galena-react';

export const { ProviderFactory, Consumer } = new ContextFactory("my-state");

// ProviderFactory is a subscription to your MyState fragment
// Consumer is a traditional React.Context Consumer

const MyComponent = () => {
  return (
    <ProviderFactory>
      <Consumer>
        {myState => {
          /*
            {
              toggle: true,
              authenticated: false,
              username: ""
            }
          */
          <ChildComponent myState={myState}>
        }}
      </Consumer>
    </ProviderFactory>
  );
}
```

While contexts are familiar, Galena by default requires no Component hierarchies in your react tree in order to work. This means, if you wish to use Galena in your React Application without any contexts or root-level wrappers, you can! Simply opt for the react hooks and connect function found in this library:

### Utilities:

#### connect

Similar to the `connect` function found in React-Redux, Galena's `connect` function can inject your Galena state values into your class or functional components. It's syntax is highly familiar:

```TypeScript
import { connect } from 'galena-react';

class MyComponent extends Component {
  render() {
    const { username } = this.props;
    return <span>{username}</span>
  }
}

export default connect((state) => {
  const { username } = state.get("my-state");
  return { username };
})(MyComponent)
```

#### useGalenaState

Alternative to `connect`, the `useGalenaState` hook can allow you to bypass the need for generating a wrapper around your components:

```TypeScript
import { useGalenaState } from 'galena-react';

const MyComponent = () => {
  const username = useGalenaState("my-state", state => state.username);
  return <span>{username}</span>
}
```

#### useEmpireState

This library also provides a means for subscribing to the global application state as opposed to fragments of it:

```TypeScript
import { useEmpireState } from 'galena-react';

const MyComponent = () => {
  const complexState = useEmpireState(state => {
    const myState = state.get("my-state");
    const otherState = state.get("other-state");
    // some computes based on current state
    return { ...myState, ...otherState}
  });
  return <span>{complexState.username}</span>
}
```

Subscriptions such as the above come with some performance drawbacks when compared to using `useGalenaState`. `useGalenaState` is highly optimized for only recomputing state values based on exact updates to the `State` fragments being subscribed to. It is often better to use multiple `useGalenaState` hooks over `useEmpireState`.
