import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import { AiOutlineDelete, AiOutlineEdit} from 'react-icons/ai'

function App() { 

  const Todos = ({ todos }) => {
    return (
      <div className="todos">
      {Array.isArray(todos)
        ? todos.map((todo) => {
        return(
          <div className="todo" key={todo.id}>
          <button
            onClick={() => modifyStatusTodo(todo)}
            className="checkbox"
            style={{ backgroundColor: todo.status ? "#A879E6" : "white" }}
          ></button>
          <p>{todo.name}</p>
          <button onClick={() => handleWithEditButtonClick(todo)}>
            <AiOutlineEdit size={20} color={"#64697b"}></AiOutlineEdit>
          </button>
          <button onClick={() => deleteTodo(todo)}>
            <AiOutlineDelete size={20} color={"#64697b"}></AiOutlineDelete>
          </button>
        </div>
        );
      })
    : null }
    </div>
    );
  }
  async function handleWithNewButton() {
    console.log("fasfas");
    setInputVisility(!inputVisbility);
  }
  async function handleWithEditButtonClick(todo) {
    setSelectedTodo(todo);
    setInputVisility(true);
  }
  async function getTodos() {
    const response = await axios.get("http://localhost:3333/todos");
    setTodos(response.data);
    console.log(response.data);
  }
  async function editTodo() {
    const response = await axios.put("http://localhost:3333/todos", {
      id: selectedTodo.id,
      name: inputValue,
    });
    setSelectedTodo();
    setInputVisility(false);
    getTodos();
    setInputValue("");
  }
  async function deleteTodo(todo) {
    const response = await axios.delete(
      `http://localhost:3333/todos/${todo.id}`
    );
    getTodos();
  }
  async function modifyStatusTodo(todo) {
    const response = await axios.put("http://localhost:3333/todos", {
      id: todo.id,
      status: !todo.status,
    });
    getTodos();
  }

  async function createTodo() {
    const response = await axios.post("http://localhost:3333/todos", {
      name: inputValue,
    });
    getTodos();
    setInputVisility(!inputVisbility);
    setInputValue("");
  }

  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [inputVisbility, setInputVisility] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState();

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <div className="App">
      <header className="container">
        <div className="header">
          <h1>ToDo List</h1>
        </div>
        <Todos todos={todos}></Todos>
        <input
          value={inputValue}
          style={{ display: inputVisbility ? "block" : "none" }}
          onChange={(event) => {
            setInputValue(event.target.value);
          }}
          className="inputName"
        ></input>
        <button
          onClick={
            inputVisbility
              ? selectedTodo
                ? editTodo
                : createTodo
              : handleWithNewButton
          }
          className="newTaskButton"
        >
          {inputVisbility ? "Confirm" : "+ New task"}
        </button>
      </header>
    </div>
  );
}

export default App;
