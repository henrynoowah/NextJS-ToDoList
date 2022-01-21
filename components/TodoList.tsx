import React, { FC, useMemo, useCallback } from "react";
import styled from "styled-components";
import palette from "../styles/palette";
import { TodoType } from "../types/todo";

const Container = styled.div`
  width: 100%;

  .bg-blue {
    background-color: ${palette.blue};
  }
  .bg-green {
    background-color: ${palette.green};
  }
  .bg-navy {
    background-color: ${palette.navy};
  }
  .bg-orange {
    background-color: ${palette.orange};
  }
  .bg-red {
    background-color: ${palette.red};
  }
  .bg-yellow {
    background-color: ${palette.yellow};
  }
`;

const TodoHeader = styled.div`
  padding: 12px;
  position: relative;
  border-bottom: 1px solid ${palette.gray};

  .todo-list-header-colors {
    display: flex;
    .todo-list-header-color-num {
      display: flex;
      margin-right: 8px;
    }
    p {
      font-size: 14px;
      line-height: 16px;
      margin: 0
      margin-left: 6px
    }
    .todo-list-header-round-color {
      width: 16px;
      height: 16px;
      border-radius: 50%;
    }
  }

`;

const TodoListLastNumber = styled.p`
  font-size: 14px;
  span {
    margin-left: 8px;
  }
`;

const List = styled.ul`
  .todo-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 52px;
    border-bottom: 1px solid ${palette.gray};

    .todo-left-side {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      .todo-color-block {
        width: 12px;
        height: 100%;
      }
      .checked-todo-text {
        color: ${palette.gray};
        text-decoration: line-through;
      }
      .todo-text {
        margin-left: 12px;
        font-size: 16px;
      }
    }
  }
`;

interface IProps {
  todos: TodoType[];
}

const TodoList: FC<IProps> = ({ todos }) => {
  const getTodoColorNums = useCallback(() => {
    let red = 0;
    let orange = 0;
    let yellow = 0;
    let green = 0;
    let blue = 0;
    let navy = 0;

    todos.forEach((todo) => {
      switch (todo.color) {
        case "red":
          red += 1;
          break;
        case "orange":
          orange += 1;
          break;
        case "yellow":
          yellow += 1;
          break;
        case "green":
          green += 1;
          break;
        case "blue":
          blue += 1;
          break;
        case "navy":
          navy += 1;
          break;
        default:
          break;
      }
    });

    return {
      red,
      orange,
      yellow,
      green,
      blue,
      navy,
    };
  }, [todos]);

  const todoColorNums = useMemo(getTodoColorNums, [todos]);
  console.log(todoColorNums);

  todos.forEach((todo) => {
    console.log(todo.checked);
  });

  return (
    <Container>
      <TodoHeader>
        <TodoListLastNumber>
          남은 TODO <span>{todos.length}개</span>
        </TodoListLastNumber>
        <div className="todo-list-header-colors">
          {Object.keys(todoColorNums).map((color, index) => (
            <div className="todo-list-header-color-num" key={index}>
              <div className={`todo-list-header-round-color bg-${color}`} />
              <p>{todoColorNums[color]}개</p>
            </div>
          ))}
        </div>
      </TodoHeader>
      <List>
        {todos.map((todo) => (
          <li className="todo-item" key={todo.id}>
            <div className="todo-left-side">
              <div className={`todo-color-block bg-${todo.color}`} />
              <p className={`todo-text ${todo.checked && "checked-todo-text"}`}>
                {todo.text}
              </p>
            </div>
          </li>
        ))}
      </List>
    </Container>
  );
};

export default TodoList;
