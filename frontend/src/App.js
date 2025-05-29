import React, { useEffect, useState } from "react";
import axios from "axios"; 

function App() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    axios.get("http://34.129.144.130:5000/todos").then(res => setTodos(res.data));
  }, []);

  const addTodo = () => {
    axios.post("http://34.129.144.130:5000/todos", { text }).then(res => {
      setTodos([...todos, res.data]);
      setText("");
    });
  };

  const deleteTodo = id => {
    axios.delete(`http://34.129.144.130:5000/todos/${id}`).then(() => {
      setTodos(todos.filter(todo => todo._id !== id));
    });
  };

  return (
    <div>
      <h1>Todo List</h1>
      <input value={text} onChange={e => setText(e.target.value)} />
      <button onClick={addTodo}>Add</button>
      <ul>
        {todos.map(todo => (
          <li key={todo._id}>
            {todo.text} <button onClick={() => deleteTodo(todo._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
