import React from "react";
import TodoList from "../components/TodoList";
import { TodoType } from "../types/todo";

const todos: TodoType[] = [
  { id: 1, text: "마트가서 장보기", color: "red", checked: false },
  { id: 2, text: "마트가서 장보기", color: "orange", checked: true },
  { id: 3, text: "마트가서 장보기", color: "yellow", checked: false },
  { id: 4, text: "마트가서 장보기", color: "green", checked: false },
];

const index = () => {
  return <TodoList todos={todos} />;
};

export default index;
