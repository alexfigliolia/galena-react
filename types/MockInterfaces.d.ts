/**
 * Mock Interfaces
 *
 * When dealing with object prototypes, jest's clearAllMocks
 * method has a tendency to flake. This interface reimplements
 * the setting and clearing of mocks consistently using simple
 * IDs and memoization
 */
export declare class MockInterfaces {
    /**
     * An auto-incrementing ID for new entries into the table
     */
    static runningID: number;
    /**
     * A hash table containing memoized mock entries
     */
    static mocks: Record<string, any>;
    /**
     * Mock Object Prototype
     *
     * Given an object, mock it's specified prototype key with the
     * value passed in. Returns a unique identifier for purpose of
     * manual cleanup (if desireable) as well as the mock
     */
    static mockObjectPrototype(proto: any, key: string, mock?: any): {
        ID: string;
        mock: any;
    };
    /**
     * Restore Object Mock
     *
     * Given a unique identifier, restore the applied mock to
     * its initial state
     */
    static restoreObjectMock(id: string): void;
    /**
     * Mock Object
     *
     * Given an object, mock it's specified key with the value
     * passed in. Returns a unique identifier for purpose of
     * manual cleanup if desireable.
     */
    static mockObject(obj: any, key: string, mock?: any): string;
    /**
     * Mock Several Prototype Keys
     *
     * Mock several prototype properties at once
     */
    static mockSeveralPrototypeKeys(proto: any, keys: string[]): void;
    /**
     * Mock Several Keys
     *
     * Mock several object properties at once
     */
    static mockSeveralKeys(obj: any, keys: string[]): void;
    /**
     * Restore All Mocks
     *
     * Restores all mocks implemented by the MockInterfaces
     * class. For real - no flake 🍻
     */
    static restoreAllMocks(): void;
}
