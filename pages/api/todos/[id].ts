import { NextApiRequest, NextApiResponse } from "next";
// 함수를 Data라는 객체로 가져온다
// Data.{getList, exists, write} 방식으로 접근 가능
import Data from "../../../lib/data";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "PATCH") {
    try {
      // req.query : pages 의 [id]와 같은 다이나믹 라우팅 접근
      const todoId = Number(req.query.id);
      // Data: josn 데이터의 todoId 의 값이 있는지 확인
      const todo = Data.todo.exist({ id: todoId });

      if (!todo) {
        res.statusCode = 404;
        res.end();
      }

      // todos : json 데이터 가져오기
      const todos = Data.todo.getList();

      // 데이터 안에 todoId와 동일한 todo.id 값의 chekced value 바꾼다
      const changedTodos = todos.map((todo) => {
        if (todo.id === todoId) {
          return { ...todo, checked: !todo.checked };
        }
        return todo;
      });
      Data.todo.write(changedTodos);
      res.statusCode = 200;
      res.end();

    } catch (e) {
      console.log(e);
      res.statusCode = 500;
      res.send(e);
    }
  }

  if (req.method === 'DELETE') {
    try {
      const todoId = Number(req.query.id);
      const todo = Data.todo.exist({ id : todoId })
      if (!todo) {
        res.statusCode = 404;
        res.end()
      }

      const todos = Data.todo.getList();
      const filteredTodos = todos.filter((todo) => todo.id !== todoId);
      Data.todo.write(filteredTodos);
      res.statusCode = 200;
      res.end(); 

    } catch (e) {
      console.log(e);
      res.statusCode = 500;
      res.end();
    }
  }

  res.statusCode = 405;
  return res.end();

}