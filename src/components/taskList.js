import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import { deleteTask } from '../features/task/taskSlice';

export default function TaskList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const tasks = useSelector(state => state.tasks)
  console.log(tasks);

  const handleDelete = (id) => {
    console.log(id);
    dispatch(deleteTask(id));
  }
  return (
    <div className="container  mx-auto">
      <header className="flex justify-between items-center py-4">
        {tasks.length === 1 ? <h1>Tarea {tasks.length}</h1> : <h1>Tareas {tasks.length}</h1>}

        <button className="bg-indigo-600 px-2 py-1 rounded-sm text-sm " onClick={() => navigate('/create-task')}>Crear tarea</button>

      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        {
          tasks.map(task => (
            <div key={task.id} className="bg-neutral-800 p-4 rounded-md">
              <header className="flex justify-between">
                <h3>{task.title}</h3>
                <div className="flex gap-x-2">
                  <Link className="bg-zinc-600 px-2 py-1 text-xs rounded-md " to={'/edit-task/' + task.id}>Edit</Link>
                  <button className="bg-red-500 px-2 py-1 text-xs rounded-md " onClick={() => handleDelete(task.id)}>Delete</button>
                  <input type="checkbox" value={task.completed} />
                </div>

              </header>

              <p>{task.description}</p>



            </div>
          ))
        }

      </div>
    </div>
  )
}
