import { Context, Dispatch as D } from "react";

export type State = {
  readonly [key: string]: any;
};

export type Action = {
  type: string;
  payload?: any;
};

export type Dispatch = D<any | any[]>;

export type Reducer = (state: State, action: Action) => State;

export type Selector = (ctx: State, d: Dispatch) => any;

export interface MapContext {
  name: string;
  state: State;
  reducer: Reducer;
}

export interface SelectorMap {
  [key: string]: Selector;
}

export interface ContextMap {
  [key: string]: Context<any>;
}

export interface IOpts {
  label?: string;
  readonly logger?: boolean | ((next: State, prev?: State) => void);
  readonly extendLogger?: boolean;
  readonly persistance?: boolean | ((label: string, next?: State) => State | void);
}
