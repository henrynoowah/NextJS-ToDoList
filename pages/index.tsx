import { NextPage } from "next";
import React from "react";
import TodoList from "../components/TodoList";
import { TodoType } from "../types/todo";
import { getTodosAPI } from "../lib/api/todo";
import { wrapper } from "../store";
import { todosSliceActions } from "../store/todo";

interface IProps {
  todos: TodoType[];
}

const app: NextPage<IProps> = ({ todos }) => {
  return <TodoList />;
};

// redux-wrapper 7.0 이후의 방식
export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async () => {
    console.log(store);
    // {
    //   dispatch: [Function: dispatch],
    //   subscribe: [Function: subscribe],
    //   getState: [Function: getState],
    //   replaceReducer: [Function: replaceReducer],
    //   '@@observable': [Function: observable]
    // }
    try {
      const { data } = await getTodosAPI();
      store.dispatch(todosSliceActions.setTodo(data));
      return { props: { todos: data } };
    } catch (e) {
      return { props: { todos: [] } };
    }
  }
);

// 구버전 방식
// export const getServerSideProps = wrapper.getServerSideProps(
//   async ({ store }) => {
//     console.log(store);
//     try {
//       const { data } = await getTodosAPI();
//       return { props: { todos: data } };
//     } catch (e) {
//       return { props: { todos: [] } };
//     }
//   }
// );

export default app;
