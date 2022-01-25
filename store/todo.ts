import { TodoType } from "../types/todo";
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

// 항상 npm-module-or-app/reducer/ACTION_TYPE 형태의 action 타입을 가져야 한다

// action type 모음
export const ActionTypes = {
  INIT_TODO_LIST: "todo/INIT_TODO_LIST",
  SET_TODO_LIST: "todo/SET_TODO_LIST"
}


interface TodoReduxState {
  todos: TodoType[];
}

// iniitalState
const initialState: TodoReduxState = {
  todos: [],
}

// action creators
export const ActionCreators = {
  setTodo: (payload: TodoType[]) => ({type: ActionTypes.SET_TODO_LIST, payload})
}

// export const setTodo = (payload: TodoType[]) => {
//   return {
//     type: ActionTypes.SET_TODO_LIST,
//     payload,
//   }
// }

// export default function reducer(state = initialState, action: any) {
//   switch (action.type) {
//     case ActionTypes.SET_TODO_LIST:
//       return {
//         ...state,
//         todos: action.payload
//       }
//       default:
//         return state;
//       }
// }

    
// createSlice 
// - actioncreator/ reducer 모음집
const todosSlice = createSlice({
  name: "todos",
  initialState: {
    todos: [],
  },
  reducers: {
    setTodo: (state, action) => {
      // ...state : 나머지 state 의 기존 데이터는 유지
      // ...action.payload : 액션의 payload 데이터를 받는다
      return { ...state, todos: [...action.payload] }
    }
  }
})


// export const todoActions = { setTodo };
// 하나씩 export 하거나
// export const { setTodo } = todosSlice.actions;
// todosSliceActions 객체로 통째로 export
export const todosSliceActions = {...todosSlice.actions};

export default todosSlice;

