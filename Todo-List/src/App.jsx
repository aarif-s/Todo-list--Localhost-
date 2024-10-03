import { useState, useEffect } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]); // all todos in this array



  // Load todos from localStorage on component mount
  useEffect(() => {
    let todoString = localStorage.getItem("todos1"); // Correct key used here
    if (todoString) {
      let savedTodos = JSON.parse(todoString); // Changed variable name to `savedTodos`
      setTodos(savedTodos); // Set state with saved todos
    }
  }, []);

  // Save todos to localStorage
  const saveToLS = (todos) => {
    localStorage.setItem("todos1", JSON.stringify(todos)); // Use the same key `todos1` consistently
  };

  

  const handleAdd = () => {
    if (todo.trim()) {
      const updatedTodos = [...todos, { id: uuidv4(), todo, isCompleted: false }];
      setTodos(updatedTodos);
      saveToLS(updatedTodos); // Save updated todos
      setTodo(""); // Clear the input
    }
  };

  const handleEdit = (id) => {
    const selectedTodo = todos.find(i => i.id === id);
    setTodo(selectedTodo.todo);

    const updatedTodos = todos.filter(item => item.id !== id);
    setTodos(updatedTodos);
    saveToLS(updatedTodos);
  };

  const handleDelete = (id) => {
    const updatedTodos = todos.filter(item => item.id !== id);
    setTodos(updatedTodos);
    saveToLS(updatedTodos);
  };

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleAdd();
    }
  };

  const handleCheckbox = (id) => {
    const updatedTodos = todos.map(item =>
      item.id === id ? { ...item, isCompleted: !item.isCompleted } : item
    );
    setTodos(updatedTodos);
    saveToLS(updatedTodos);
  };

  return (
    <>
      <Navbar />
      <div className="container min-h-[70vh] w-1/2 mx-auto bg-purple-200 rounded-lg p-2">
        <h1 className="text-center flex justify-center text-xl font-bold">
          iTask - Manage your todos at one place
        </h1>
        <div className="addtodo">
          <h2 className="my-2">Add a Todo</h2>
          <div className="flex gap-2">
            <input
              placeholder="Enter todo"
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              value={todo}
              type="text"
              className="rounded-md w-[60%] p-1"
            />
            <button
              onClick={handleAdd}
              className="bg-purple-600 rounded-md p-1 px-2 hover:bg-purple-900 text-white"
            >
              Save
            </button>
          </div>
        </div>
        <div className="flex gap-1 mt-3 text-xs">
          <input type="checkbox" />
          <label htmlFor="show">Show Finished</label>
        </div>
        <div>
          <h1 className="font-bold mb-2">Your Todos</h1>
          {todos.length === 0 && <div className="m-1">No Todos to display</div>}
          {todos.map((item) => (
            <div key={item.id} className="todos flex justify-between md:w-3/4 mb-1">
              <div className="flex gap-2">
                <input
                  name={item.id}
                  onChange={() => handleCheckbox(item.id)}
                  type="checkbox"
                  checked={item.isCompleted}
                />
                <div className={item.isCompleted ? "line-through" : ""}>
                  {item.todo}
                </div>
              </div>
              <div className="flex gap-1">
                <button
                  onClick={() => handleEdit(item.id)}
                  type="submit"
                  className="bg-purple-600 rounded-md p-1 px-2 hover:bg-purple-900 text-white"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="bg-purple-600 rounded-md p-1 px-2 hover:bg-purple-900 text-white"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
