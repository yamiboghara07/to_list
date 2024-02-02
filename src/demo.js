import { useState } from 'react';
import './App.css';

function App() {

  const [tasks, settasks] = useState([]);
  const [newtask, setnewtask] = useState('');
  const [editingTask, seteditingTask] = useState(null);

  const addclick = () => {
    if (newtask.trim() !== '') {
      settasks([...tasks, { id: Date.now(), text: newtask }]);
      setnewtask('');
    }
  };

  const deletetask = (taskid) => {
    const upateTasks = tasks.filter((task) => task.id !== taskid) 
    settasks(upateTasks);
  }

  const edittask = (taskid) => {
    const editedTaskText = prompt('Edit the task:');
    if (editedTaskText !== null) {
      seteditingTask(taskid);
      upateTask(taskid, editedTaskText);
    }
  };

  const upateTask = (taskid, newtext) => {
    const upateTasks = tasks.map((task) =>
      task.id === taskid ? { ...task, text: newtext } : task
    );
    settasks(upateTasks);
    seteditingTask(null);
  }

  const taskcomplate = (taskid) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskid ? { ...task, completed: !task.completed } : task
    );
    settasks(updatedTasks);
  }

  return (
    <div className="App">
      <h1> to do list</h1>
      <div className="box">
        <input type="text" value={newtask} onChange={(e) => setnewtask(e.target.value)}></input>
      </div>
      <div className="btn">
        <input type="button" value='Add' onClick={addclick}></input>
      </div>
      <div className='task'>
        {tasks.map((task) => (
          <p className="btnn" key={task.id}>
            <div className='check'>
              <input type='checkbox' checked={task.completed} onChange={() => taskcomplate(task.id)}  style={{ margin: '0px 15px 0px 0px' }}></input>
              {editingTask === task.id ? (
                <input type='text' value={task.text} onChange={(e) => upateTask(task.id, e.target.value)}></input>

              ) : (
                <span style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
                  {task.text}
                </span>
              )}
            </div>
            <div>
              <button type='button' onClick={() => deletetask(task.id)}>Delete</button>
              <button type='button' onClick={() => edittask(task.id)}>Edit</button>
            </div>

          </p>
        ))}
      </div>
    </div>
  )

}

export default App