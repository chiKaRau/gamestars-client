import { combineReducers, createStore } from "redux";

// Actions.js
export const setKeyword = payload => ({
  type: "SET_KEYWORD",
  PAYLOAD: payload
});

// DataReducer.js
const initialState = {
  keyword: ""
};

export const DataReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_KEYWORD":
      return { ...state, keyword: action.PAYLOAD.keyword };
    default:
      return state;
  }
};

// RootReducer.js
export const RootReducer = combineReducers({
  DataReducer
});

// Store.js
export default function configureStore() {
  return createStore(RootReducer);
}
