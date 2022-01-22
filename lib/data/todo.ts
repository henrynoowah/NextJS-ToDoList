import { readFileSync } from "fs";
import { TodoType } from "../../types/todo";

const getList = () => {
  const todosBuffer = readFileSync("data/json/todo.json");
  const todosString = todosBuffer.toString();
  if (!todosString) {
    return [];
  }
  const todos: TodoType[] = JSON.parse(todosString);
  return todos;
}

const exist = ({id} : {id: number}) => {
  const todos = getList();
  const todo = todos.some((todo) => todo.id === id)

  return todo;
}

export default { getList, exist };