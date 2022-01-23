import { TodoType } from "../types/todo";

// 항상 npm-module-or-app/reducer/ACTION_TYPE 형태의 action 타입을 가져야 한다
export const INIT_TODO_LIST = "todo/INIT_TODO_LIST";
export const SET_TODO_LIST = "todo/SET_TODO_LIST";

export const setTodo = (payload: TodoType[]) => {
  return {
    type: SET_TODO_LIST,
    payload,
  }
}

export const todoActions = { setTodo };

interface TodoReduxState {
  todos: TodoType[];
}

const initialState: TodoReduxState = {
  todos: [],
}

export default function reducer(state = initialState, action: any) {
  switch (action.type) {
    case SET_TODO_LIST:
      return {
        ...state,
        todos: action.payload
      }
    default:
      return state;
  }
}
