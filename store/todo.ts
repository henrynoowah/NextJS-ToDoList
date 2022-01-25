import { TodoType } from "../types/todo";
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

// ducks patter 항상 npm-module-or-app/reducer/ACTION_TYPE 형태의 action 타입을 가져야 한다
// action type 모음
export const ActionTypes = {
  INIT_TODO_LIST: "todo/INIT_TODO_LIST",
  SET_TODO_LIST: "todo/SET_TODO_LIST"
}

interface TodoReduxState {
  todos: TodoType[];
}
    
// createSlice 
const todosSlice = createSlice({
  name: "todos",
  initialState: {
    todos: [],
  },
  reducers: {
    setTodo: (state, action: PayloadAction<TodoType[]>) => {
      // ...state : 나머지 state 의 기존 데이터는 유지
      // ...action.payload : 액션의 payload 데이터를 받는다
      return { ...state, todos: [...action.payload] }
    }
  }
})

export const todosSliceActions = {...todosSlice.actions};

export default todosSlice;

