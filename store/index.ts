import { createStore, applyMiddleware, combineReducers } from "redux";
import { HYDRATE, createWrapper } from "next-redux-wrapper"
import todosSlice from "./todo";
const rootReducer = combineReducers({
  todo: todosSlice.reducer
})

const reducer = (state, action) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state, 
      ...action.payload,
    };
    if (state.count) nextState.count = state.count;
    return nextState;
  }
  return rootReducer(state, action);
};

export type RootState = ReturnType<typeof rootReducer>;

// middleware
const bindMiddleware = (middleware: any) => {
  if (process.env.NODE_ENV != "production") {
    const { composeWithDevTools } = require("redux-devtools-extension");
    return composeWithDevTools(applyMiddleware(...middleware));
  }
  return applyMiddleware(...middleware);
}

const initStore = () => {
  return createStore(reducer, bindMiddleware([]));
}

export const wrapper = createWrapper(initStore)