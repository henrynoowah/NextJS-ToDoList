import { GetServerSideProps, NextPage } from "next";
import React from "react";
import TodoList from "../components/TodoList";
import { TodoType } from "../types/todo";
import { getTodosAPI } from "../lib/api/todo";

interface IProps {
  todos: TodoType[];
}

const app: NextPage<IProps> = ({ todos }) => {
  return <TodoList todos={todos} />;
};

export default app;

export const getServerSideProps: GetServerSideProps = async () => {
  // console.log(process.env.NEXT_PUBLIC_API_URL);
  try {
    const { data } = await getTodosAPI();
    return {
      props: {
        todos: data,
      },
    };
  } catch (e) {
    // console.log(e);
    return {
      props: {
        todos: [],
      },
    };
  }
};
