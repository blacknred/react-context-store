import { storeFactory } from "./CustomHooks";

const initialState = {
  count: 0
};

type Action = {
  type: string;
};

function reducer(state: any, action: Action) {
  switch (action.type) {
    case "ACTION_INCR":
      const newState = { count: state.count + 1 };
      return newState;
    default:
      return state;
  }
}

// init

const [Store, Provider] = storeFactory(initialState, reducer, true);

export { Store, Provider };
