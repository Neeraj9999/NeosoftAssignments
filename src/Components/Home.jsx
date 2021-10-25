import { nanoid } from "nanoid";
import React, { useContext, useState } from "react";
import styled from "styled-components";
import { TodoContext } from "../App";
import { validate } from "../Common";

export default function Home() {
  const [state, setstate] = useState({
    taskName: "",
    priority: 0,
    error: {
      taskName: "",
      priority: "",
    },
  });
  const priorityString = ["Lowest", "Low", "Average", "High", "Highest"];

  const { user, setUser } = useContext(TodoContext);

  const onChangeHandler = ({ target: { name, value } }) =>
    setstate({
      ...state,
      [name]: value,
      error: { ...state.error, [name]: validate(name, value) },
    });

  const submitHandler = (ev) => {
    ev.preventDefault();
    state.priority === 0 &&
      setstate({
        ...state,
        error: {
          ...state.error,
          priority: "Required !!.",
        },
      });
    state.taskName === "" &&
      setstate({
        ...state,
        error: {
          ...state.error,
          taskName: "Required !!.",
        },
      });
    if (
      state.error.taskName === "" &&
      state.taskName !== "" &&
      state.error.priority === "" &&
      state.priority !== 0
    ) {
      const { error, ...newTask } = state;
      setUser({
        ...user,
        todoList: [{ ...newTask, completed: false }, ...user.todoList],
      });
    }
  };

  const deleteTask = (index) =>
    setUser({
      ...user,
      todoList: [
        ...user.todoList.slice(0, index),
        ...user.todoList.slice(index + 1),
      ],
    });
  const completeTask = (index) =>
    setUser({
      ...user,
      todoList: [
        ...user.todoList.slice(0, index),
        { ...user.todoList[index], completed: true },
        ...user.todoList.slice(index + 1),
      ],
    });

  const logout = () => {
    let data = JSON.parse(localStorage.getItem("user"));
    localStorage.setItem("user", JSON.stringify([...data.slice(0, user.user)]));
    setUser({ ...user, auth: false });
    setUser({ userIndex: -1 });
  };

  return (
    <Tata>
      <div className="getTodo">
        <span style={{ display: "flex", gap: "3px" }}>
          <h2>TODO</h2>
          <button className="logOutButton" onClick={logout}>
            LogOut
          </button>
        </span>
        <form onSubmit={submitHandler}>
          <div className="inputGroup">
            <label htmlFor="priority">Task Name </label>
            <input
              type="text"
              name="taskName"
              value={state.taskName}
              onChange={onChangeHandler}
            />
            {state.error.taskName.length > 0 && <p>{state.error.taskName}</p>}
          </div>
          <div className="inputGroup">
            <label htmlFor="priority">Select Priority: </label>
            <select
              name="priority"
              value={state.priority}
              onChange={(ev) =>
                setstate({
                  ...state,
                  priority: +ev.target.value,
                  error: { ...state.error, priority: "" },
                })
              }
            >
              <option value="1">Lowest</option>
              <option value="2">Low</option>
              <option value="3">Average</option>
              <option value="4">High</option>
              <option value="5">Highest</option>
            </select>
            {state.error.priority.length > 0 && <p>{state.error.priority}</p>}
          </div>
          <div className="inputGroup">
            <button>Add</button>
          </div>
        </form>
      </div>
      <div className="listTodo">
        {user.todoList.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Task Name</th>
                <th>Priority</th>
              </tr>
            </thead>
            <tbody>
              {user.todoList.map((task, index) => (
                <tr key={nanoid()}>
                  <td
                    style={
                      task.completed ? { textDecoration: "line-through" } : {}
                    }
                  >
                    {task.taskName}
                  </td>
                  <td
                    style={
                      task.completed ? { textDecoration: "line-through" } : {}
                    }
                  >
                    {priorityString[task.priority - 1]}
                  </td>
                  <td>
                    <span
                      disabled={task.completed}
                      onClick={() => completeTask(index)}
                    >
                      ✔
                    </span>
                    <span onClick={() => deleteTask(index)}>X</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          "No task"
        )}
      </div>
    </Tata>
  );
}

const Tata = styled.div`
height: 100vh;
width: 100vw;
display: grid;
grid-template-rows: minmax(200px, 0.1fr);
gap: 20px;
.getTodo{
    display: grid;
    place-items: center;
    form{
        height: 100%;
        min-width: 50vw;
        display: grid;
        place-items: center;
        padding:5px;
        gap:20px;
        background:rgba(255,0,0,.3);
        @media only screen and (max-width: 600px) {
            width:100vw;
           }
        .inputGroup{
            width: 100%;
            height: 100%;
            position:relative;
            input{
                height: 76%;
                width: 100%;
                background: none;
                border: none;
                border-bottom: 2px solid black;
                font-size:24px;
                outline:none;
            }
            select{
                height:71%;
                border:none;
                background:white;
            }
            button{
                height:100%;
                width:100%;
                background:white;
                border:none;
                font-size:18px;
            }
            p{
                color:red;
            }
        }
    }
}
}
.listTodo {
    display: grid;
    place-items: self-start;
    justify-content: center;
    table {
        background: grey;
        width: 61vw;
        padding: 7px;
        color:white;
        @media only screen and (max-width: 600px) {
           width:100vw;
          }
      thead {
        height: 30px;
      }
      tbody {
        text-align: center;
        tr {
          height: 40px;
          td:last-child {
            display: flex;
            height: 40px;
            justify-content: center;
            align-items: center;
            gap: 5px;
            span {
              width: 100%;
              height: 100%;
              display: grid;
              place-items: center;
              border: 1px solid red;
            }
            span:nth-child(1) {
              color: lime;
              border: 1px solid lime;
            }
            span:nth-child(2) {
              color: red;
              border: 1px solid red;
            }
          }
        }
      }
    }
  }
`;

const TodoContainer = styled.div`
  height: 100vh;
  width: 100vw;
  background: grey;
  display: grid;
  grid-template-rows: minmax(200px, 0.1fr);
  gap: 20px;
  .getTodo {
    display: grid;
    place-items: center;
    form {
      width: 50vw;
      display: grid;
      gap: 25px;
      .inputGroup {
        min-height: 40px;
        input {
          height: 100%;
          width: 100%;
          border: none;
          font-size: 25px;
          padding: 0px 5px;
        }
        select {
          height: 70%;
          border: none;
          text-align: center;
          font-size: 18px;
          outline: none;
        }
        p {
          padding: 1px 0px;
          font-size: 15px;
        }
      }
      button {
        height: 39px;
        font-size: 20px;
        border: none;
      }
    }
  }
  .listTodo {
    table {
      width: 100%;
      background: white;
      thead {
        height: 30px;
      }
      tbody {
        text-align: center;
        tr {
          height: 40px;
          td:last-child {
            display: flex;
            height: 40px;
            justify-content: center;
            align-items: center;
            gap: 5px;
            span {
              width: 100%;
              height: 100%;
              display: grid;
              place-items: center;
              border: 1px solid red;
            }
            span:nth-child(1) {
              color: lime;
              border: 1px solid lime;
            }
            span:nth-child(2) {
              color: red;
              border: 1px solid red;
            }
          }
        }
      }
    }
  }
`;
