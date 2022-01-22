import { NextApiRequest, NextApiResponse } from "next";
import { TodoType } from "../../types/todo";
import fs from 'fs';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    try {
      const todosBuffer = fs.readFileSync("data/todos.json");
      console.log(todosBuffer)
      const todosString = todosBuffer.toString();
      if(!todosString) {
        res.statusCode = 200;
        res.send([]);
      }
      const todos: TodoType[] = JSON.parse(todosString);
      res.statusCode = 200;
      return res.send(todos);
    } catch (e) {
      console.log(e);
      res.statusCode = 500;
      res.send(e);
    }
  }
};
