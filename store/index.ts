import { createStore, applyMiddleware, combineReducers } from "redux";
import { HYDRATE, createWrapper } from "next-redux-wrapper"
import todo from "./todo";

const rootReducer = combineReducers({
  todo
})

// "__NEXT_REDUX_WRAPPER_HYDRATE__" 님 리듀서를 추가
// HYDRATE : 서버에 생성된 리덕스 스토어를 클라이언트에서 사용할 수 있도록 전달해주는 역할
const reducer = (state, action) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state, // use previous state
      ...action.payload, // apply delta from hydration
    };
    if (state.count) nextState.count = state.count;
    return nextState;
  }
  return rootReducer(state, action);
};

// store type
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