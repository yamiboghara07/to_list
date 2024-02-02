  import React, { useState } from 'react';
  import './App.css';

  function App() {
    const [inputValue, setInputValue] = useState('');
    const [todos, setTodos] = useState([]);
    const [editingTask, setEditingTask] = useState();
    const [search, setsearch] = useState('');
    const [reset, setreset] = useState([]);

    function handleSubmit() {
      if (editingTask !== undefined) {
        const updatedTodos = [...todos];
        updatedTodos[editingTask].text = inputValue;
        setTodos(updatedTodos);
        setEditingTask(undefined);
      } else 
      if (inputValue.trim() !== '') {
        setTodos([...todos, { text: inputValue, completed: false }]);
        setreset([...reset, { text: inputValue, completed: false }]);
      }
      setInputValue('');
    }

    const handleDelete = (value) => {
      const updatedTasks = todos.filter((todo) => todo.text !== value);
      setTodos(updatedTasks);
    };

    const handleEdit = (index) => {
      setInputValue(todos[index].text);
      setEditingTask(index);
    };

    const Complete = (index) => {
      const updatedTodos = [...todos];
      updatedTodos[index] = { ...updatedTodos[index], completed: !updatedTodos[index].completed };
      setTodos(updatedTodos);
      setreset(updatedTodos);
    };

   

    const Combtn = () => {
      const completebtn = reset.filter((todo) => {
        return todo.completed === true;
      });
      setTodos(completebtn);
    };

    const unCombtn = () => {
      const completebtn = reset.filter((todo) => {
        return todo.completed === false;
      });
      setTodos(completebtn);
    };

    const allbtn = () => {
      setTodos([...reset]);
    }

    return (
      <div className='App'>
        <h1 className='title'>to do List</h1>
        <div className="box">
          <input type='text' value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
        </div>
        <div className="btn">
          <button onClick={handleSubmit}>Add Todo</button>
        </div>
        <ul>
          <div className='search'>
            <input type='text' placeholder='search...' value={search} onChange={(e) => setsearch(e.target.value)}></input>
          </div>
          <div className='event'>
            <button onClick={Clickbtn}>click</button>
            <button onClick={Combtn}>completed</button>
            <button onClick={unCombtn}>uncompleted</button>
            <button onClick={allbtn}>all</button>
          </div>
          <div className='task'>
            {todos.map((todo, index) => (
              <li key={index} className="btnn" >
                <div>
                  <input type='checkbox' checked={todo.completed} onChange={() => Complete(index)} style={{ margin: '0px 10px 0px 0px' }}></input>
                  <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>{todo.text}</span>
                </div>
                <div>
                  <button onClick={() => handleDelete(todo.text)}>Delete</button>
                  <button onClick={() => handleEdit(index)}>Edit</button>
                </div>
              </li>
            ))}
          </div>
        </ul>
      </div>
    );
  }

  export default App;
