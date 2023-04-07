import { useState, useEffect } from "react";
import "./App.css";
import styled from "styled-components";

import API_BASE from "./components/api_base";

function App() {
  const [todos, setTodos] = useState([]);
  const [popUpActive, setPopUpActive] = useState(false);
  const [newTodo, setNewTodo] = useState("");

  useEffect(() => {
    GetTodo();
  }, []);

  const GetTodo = () => {
    fetch(API_BASE + "/todos")
      .then((res) => res.json())
      .then((data) => setTodos(data))
      .catch((err) => console.log(err));
  };

  const CompleteTodo = async id => {
    const data = await fetch(API_BASE + "/todo/complete/"+ id , {method: 'PUT'})
    .then((res) => res.json())

    setTodos(todos => todos.map(todo => {
        if(todo._id === data._id){
          todo.complete = data.complete
        }

        return todo
      })
  )}

  const RemoveTodo = async id => {
    const data = await fetch(API_BASE + "/todo/delete/"+ id, {method: "DELETE"})
    .then((res) => res.json())

    setTodos(todos => todos.filter(todo => todo._id !== data._id))
  }

  const AddTodo = async () => {
    const data = await fetch(API_BASE + "/todo/new", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: newTodo,
      })
    }).then(res => res.json())

    setTodos([...todos,data])
    setPopUpActive(false)
    setNewTodo("")
  }

  return (
    <div className="App">
      <h1 className="app__header">Todo</h1>
      <div className="todos">
        {todos.map((todo) => (
          <Todo key={todo._id} onClick = { () => CompleteTodo(todo._id)}>
            <div className={"todo__indicator" + (todo.complete ? " todo__completed" : "")}></div>
            <div className={"todo__name" + (todo.complete ? " strike__through" : "")}>{todo.text}</div>
            <div className="todo__remove" onClick={ () => RemoveTodo(todo._id)}><h1>x</h1></div>
          </Todo>
        ))}
      </div>
      <div className="add__todo" onClick={() => setPopUpActive(true)}>+</div>
      {popUpActive ? (
        <div className="popup">
          <div className="closepopup" onClick={() => setPopUpActive(false)}>x</div>
          <div className="content">
            <h3 className="popup__title">Add Task</h3>
            <input type="text" className="newtodo" placeholder="Add new Task" value={newTodo} onChange={(e) => setNewTodo(e.target.value)}/>
            <button className="submit__button" onClick={AddTodo}>Add</button>
          </div>
        
        </div>
      ) : ''}
    </div>
  );
}

export default App;

const Todo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #3b3b3b;
  border-radius: 8px;
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  cursor: pointer;
  .todo__indicator {
    width: 15px;
    height: 15px;
    background: #fff;
    border-radius: 999px;
    padding: 7.5px;
    margin: 10px;
  }
  .todo__completed {
    background: red;
  }
  .todo__remove {
    height: 15px;
    width: 15px;
    color: #fff;
    padding: 7.5px;
    margin: 10px;
    transition: color 0.4s;
    cursor: pointer;
    background: red;
    border-radius: 999px;
    display: grid;
    place-items: center;
    &:hover {
      color: red;
    }
    h1{
      transform: translate(-50%,-50%);
      font-weight: 300px;
      font-size: 10px;
    }
  }
  .todo__name {
    color: #fff;
    font-weight: 500;
    text-transform: capitalize;
  }
  .strike__through {
    text-decoration: line-through;
  }
`;
