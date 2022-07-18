import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTask, editTask } from "../features/task/taskSlice";
import { v4 as uuid } from "uuid";
import { useNavigate, useParams } from "react-router-dom";
function TaskForm() {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks);
  const [task, setTask] = useState({
    id: uuid(),
    title: "",
    description: "",
    completed: false,
  });

  const handleTask = (e) => {
    setTask({
      ...task,
      [e.target.name]: e.target.value,
    });
  };

  const handleTaskSubmit = (e) => {
    e.preventDefault();
    console.log(task);
    if (params.id) {
      dispatch(editTask(task));
    } else {
      dispatch(addTask(task));
    }

    navigate("/");
  };
  useEffect(() => {
    if (params.id) {
      setTask(tasks.find((task) => task.id === params.id));
    }
  }, [params.id,tasks]);

  return (
    <form onSubmit={handleTaskSubmit} className="bg-zinc-800 max-2-sm p-4 mb-2">
      <label htmlFor="title" className="block text-xs font-bold mb-2">
        Tarea:
      </label>
      <input
        type="text"
        placeholder="title"
        name="title"
        onChange={handleTask}
        value={task.title}
        className="w-full p-2 rounded-md bg-zinc-600 mb-2"
      />

      <label htmlFor="description" className="block text-xs font-bold mb-2">
        Descripción:
      </label>
      <textarea
        name="description"
        placeholder="description"
        onChange={handleTask}
        value={task.description}
        className="w-full p-2 rounded-md bg-zinc-600 mb-2"
      />

      <button  className="bg-indigo-600 px-2 py-1 rounded-sm text-sm " type="submit">Guardar</button>
    </form>
  );
}

export default TaskForm;
