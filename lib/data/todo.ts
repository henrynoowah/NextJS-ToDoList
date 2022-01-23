import { readFileSync, writeFileSync } from "fs";
import { TodoType } from "../../types/todo";

const getList = () => {
  const todosBuffer = readFileSync("data/todos.json");
  const todosString = todosBuffer.toString();
  if (!todosString) {
    return [];
  }
  const todos: TodoType[] = JSON.parse(todosString);
  return todos;
}

// object 의 일부의 데이터를 받아올 때는 {} 안에 선언하며 각 값에 대한 타입도 {} 안에 지정해야 한다
const exist = ({id} : {id: number}) => {
  const todos = getList();
  const todo = todos.some((todo) => todo.id === id)

  return todo;
}

const write = async (todos: TodoType[]) => {
  // 투두리스트 저장하기
  writeFileSync("data/todos.json", JSON.stringify(todos))
}

// export default 도 {} 를 활용하여 1개 이상 default export가 가능하다!!
export default { getList, exist, write };