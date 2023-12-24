import { useState, useRef } from "react";
import Todolist from "./Todolist";
import {v4 as uuidv4} from "uuid";

function App() {
  const [todos, setTodos] = useState([]);

  const todoNameRef = useRef();

  const handleAddTodo = () => {
    // タスクを追加する。
    const name = todoNameRef.current.value;
    if (name === "") return;
    setTodos((prevTodos) => {
      return [...prevTodos, { id: uuidv4(), name: name, completed: false}];
    });
    todoNameRef.current.value = null;
  };

  const toggleTodo = (id) => {
    const newTodos = [...todos];
    const todo = newTodos.find((todo) => todo.id === id);
    todo.completed = !todo.completed;
    setTodos(newTodos);
  };

  const handleCler = () => {
    const newTodos = todos.filter((todo) => !todo.completed);
    setTodos(newTodos);
  }

  return <div>
    <Todolist todos={todos} toggleTodo={toggleTodo} />
    <input placeholder="商品名" type="text" ref={todoNameRef} />
    <button onClick={handleAddTodo}>追加</button>
    <button onClick={handleCler}>削除</button><br />
    <div>登録個数:{todos.filter((todo) => !todo.completed).length}
    </div>
  </div>;
}

export default App;