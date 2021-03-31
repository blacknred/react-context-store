import createStore, { State, Action } from "../core";

const initialState = {
  title: "just a title connected to store",
  counter: 0,
  isInfinite: false,
  url: ""
};

function reducer(state: State, action: Action) {
  switch (action.type) {
    case "ACTION_INCR":
      return {
        ...state,
        counter: state.counter + 1
      };
    case "ACTION_UPD":
      const { title } = state;
      return {
        ...state,
        title: /^[A-Z ]+$/.test(title)
          ? title.toLowerCase()
          : title.toUpperCase()
      };
    default:
      return state;
  }
}

export default createStore(initialState, reducer, {
  label: "IMAGE_FEED_STATE",
  logger: true
});

// function handleToggle(name: string) {
//   return function() {
//     changeAppState({
//       ...appState,
//       [name]: !appState[name]
//     });
//   };
// }

// function handleChange(name: string) {
//   return function(val: string) {
//     changeAppState({
//       ...appState,
//       [name]: val
//     });
//   };
// }
