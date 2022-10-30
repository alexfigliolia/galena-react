import { jest } from "@jest/globals";
/**
 * Mock Interfaces
 *
 * When dealing with object prototypes, jest's clearAllMocks
 * method has a tendency to flake. This interface reimplements
 * the setting and clearing of mocks consistently using simple
 * IDs and memoization
 */
export class MockInterfaces {
  /**
   * An auto-incrementing ID for new entries into the table
   */
  static runningID = 0;
  /**
   * A hash table containing memoized mock entries
   */
  static mocks: Record<string, any> = {};

  /**
   * Mock Object Prototype
   *
   * Given an object, mock it's specified prototype key with the
   * value passed in. Returns a unique identifier for purpose of
   * manual cleanup (if desireable) as well as the mock
   */
  static mockObjectPrototype(proto: any, key: string, mock: any = jest.fn()) {
    const ID = (++this.runningID).toString();
    this.mocks[ID.toString()] = {
      original: proto.prototype[key],
      interface: proto.prototype,
      key,
    };
    proto.prototype[key] = mock;
    return { ID, mock };
  }

  /**
   * Restore Object Mock
   *
   * Given a unique identifier, restore the applied mock to
   * its initial state
   */
  static restoreObjectMock(id: string) {
    const { original, interface: proto, key } = this.mocks[id];
    if (original === undefined) {
      delete proto[key];
    } else {
      proto[key] = original;
    }
    delete this.mocks[id];
  }

  /**
   * Mock Object
   *
   * Given an object, mock it's specified key with the value
   * passed in. Returns a unique identifier for purpose of
   * manual cleanup if desireable.
   */
  static mockObject(obj: any, key: string, mock: any = jest.fn()) {
    const ID = (++this.runningID).toString();
    this.mocks[ID.toString()] = {
      original: obj[key],
      interface: obj,
      key,
    };
    obj[key] = mock;
    return ID;
  }

  /**
   * Mock Several Prototype Keys
   *
   * Mock several prototype properties at once
   */
  static mockSeveralPrototypeKeys(proto: any, keys: string[]) {
    keys.forEach((key) => {
      this.mockObjectPrototype(proto, key);
    });
  }

  /**
   * Mock Several Keys
   *
   * Mock several object properties at once
   */
  static mockSeveralKeys(obj: any, keys: string[]) {
    keys.forEach((key) => {
      this.mockObject(obj, key);
    });
  }

  /**
   * Restore All Mocks
   *
   * Restores all mocks implemented by the MockInterfaces
   * class. For real - no flake 🍻
   */
  static restoreAllMocks() {
    for (const id in this.mocks) {
      const { original, interface: proto, key } = this.mocks[id];
      if (original === undefined) {
        delete proto[key];
      } else {
        proto[key] = original;
      }
    }
    this.mocks = {};
  }
}
