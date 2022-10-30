# Galena

Galena is a lightning fast framework-agnostic state manager that comes in at less than 4kb minified. Galena gets its speed from two primary design decisions:

1. Mutable state updates - Galena will never require you to create shallow or deep copies of your state before your update it. With Galena your state updates occur in O(1) space.
2. An event emitter - Galena uses an event emitter to handle internal reconciliations of state. No more deep object comparisons required to figure out what changed.

Galena is also smart enough to emit state updates based on internal subscription patterns. Galena creates living fragments from your global state object - meaning subscribers can be differentiated from one another based upon the state it consumes. This allows consumers of your state to never require complex memoization in order to prevent wasteful rerenders or dead computations (cough _react_ cough). If your application has hundreds of consumers on a particular fragment of the global state, those subscriptions will remain fully dormant until a change is emitted to the fragment of state they consume.

## Installation

```bash
npm i -S galena
# or
yarn add galena
# or
bolt add galena
```

### Getting Started
