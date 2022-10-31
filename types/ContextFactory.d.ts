import React from "react";
import type { Context, ComponentType } from "react";
/**
 * Context Factory
 *
 * A Factory for creating contexts from your state fragments.
 * Returns a Context and a ProviderFactory subscribed to your]
 * state fragment
 *
 * `const { Context, ProviderFactory } = new ContextFactory("state-name");`
 */
export declare class ContextFactory<T> {
    Context: Context<T>;
    ProviderFactory: ComponentType<T>;
    constructor(stateName: string);
    /**
     * Create Provider
     *
     * Returns a Context.Provider with a living subscription to your
     * specified state fragment
     */
    createProvider(stateName: string): {
        new (props: any): {
            mounted: boolean;
            subscription: string;
            initializeSubscription(): string;
            componentWillUnmount(): void;
            render(): JSX.Element;
            context: unknown;
            setState<K extends keyof T>(state: T | ((prevState: Readonly<T>, props: Readonly<any>) => T | Pick<T, K> | null) | Pick<T, K> | null, callback?: (() => void) | undefined): void;
            forceUpdate(callback?: (() => void) | undefined): void;
            readonly props: Readonly<any>;
            state: Readonly<T>;
            refs: {
                [key: string]: React.ReactInstance;
            };
            componentDidMount?(): void;
            shouldComponentUpdate?(nextProps: Readonly<any>, nextState: Readonly<T>, nextContext: any): boolean;
            componentDidCatch?(error: Error, errorInfo: React.ErrorInfo): void;
            getSnapshotBeforeUpdate?(prevProps: Readonly<any>, prevState: Readonly<T>): any;
            componentDidUpdate?(prevProps: Readonly<any>, prevState: Readonly<T>, snapshot?: any): void;
            componentWillMount?(): void;
            UNSAFE_componentWillMount?(): void;
            componentWillReceiveProps?(nextProps: Readonly<any>, nextContext: any): void;
            UNSAFE_componentWillReceiveProps?(nextProps: Readonly<any>, nextContext: any): void;
            componentWillUpdate?(nextProps: Readonly<any>, nextState: Readonly<T>, nextContext: any): void;
            UNSAFE_componentWillUpdate?(nextProps: Readonly<any>, nextState: Readonly<T>, nextContext: any): void;
        };
        contextType?: React.Context<any> | undefined;
    };
}
