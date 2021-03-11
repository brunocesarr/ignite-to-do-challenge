import '../styles/tasklist.scss';

import { useEffect, useState } from 'react';
import { FiCheckSquare, FiTrash } from 'react-icons/fi';
import { v4 as uuidv4 } from 'uuid';

interface Task {
  id: string;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [isInvalidTitle, setIsInvalidTitle] = useState<boolean>(false);

  useEffect(() => {
    if (isInvalidTitle)
      setTimeout(() => {
        setIsInvalidTitle(false);
      }, 2000);
  }, [isInvalidTitle]);

  const validateTitle = () => {
    if (!newTaskTitle)
      return false;
    if (newTaskTitle.trim().length === 0)
      return false;

    return true;
  }

  const handleCreateNewTask = () => {
    if (!validateTitle()) {
      setIsInvalidTitle(true);
      return;
    }

    const newTask : Task = {
      id: uuidv4(),
      title: newTaskTitle,
      isComplete: false
    }
    setTasks([...tasks, newTask]);
  }

  const handleToggleTaskCompletion = (id: string) => {
    const newTasksList = tasks
      .map(task => {
        if (task.id === id)
          return {...task, isComplete: !task.isComplete};

        return task;
      });

    setTasks(newTasksList);
  }

  const handleRemoveTask = (id: string) => {
    const newTasksList = tasks
      .filter(task => task.id !== id);

    setTasks(newTasksList);
  }

  return (
    <section className="task-list container">
      <header>
        <h2>My tasks</h2>

        <div>
          <div className="input-group">
            <input 
              type="text" 
              placeholder="Adicionar novo todo" 
              onChange={(e) => setNewTaskTitle(e.target.value)}
              value={newTaskTitle}
            />
            <button type="submit" data-testid="add-task-button" onClick={handleCreateNewTask}>
              <FiCheckSquare size={16} color="#fff"/>
            </button>
          </div>
          <div className="bar-error" hidden={!isInvalidTitle}>
            <i className="ico">&#9747;</i> Task Title Invalid!
          </div>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              <div className={task.isComplete ? 'completed' : ''} data-testid="task" >
                <label className="checkbox-container">
                  <input 
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button type="button" data-testid="remove-task-button" onClick={() => handleRemoveTask(task.id)}>
                <FiTrash size={16}/>
              </button>
            </li>
          ))}
          
        </ul>
      </main>
    </section>
  )
}