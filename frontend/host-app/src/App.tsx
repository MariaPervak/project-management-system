import { useState } from "react";
import List from "task_module/List";
import Input from "task_module/Input";

function App() {
  const [newTodo, setNewTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const onSubmit = () => {
    // @ts-ignore
    setTodos((prev:any) => [...prev, newTodo]);
    setNewTodo("");
  };

  return (
    <>
      <Input value={newTodo} onChange={setNewTodo} onSubmit={onSubmit} />
      <List items={todos} />
    </>
  );
}

export default App;