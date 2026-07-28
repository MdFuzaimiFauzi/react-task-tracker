import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from 'react-router-dom';

import MainLayout from './layouts/MainLayout.jsx';
import HomePage from './pages/HomePage.jsx';
import TasksPage from './pages/TasksPage.jsx';
import TaskPage, { taskLoader } from './pages/TaskPage.jsx';
import TaskForm from './components/TaskForm.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';

// Add a new task
const addTask = async (newTask) => {
  const response = await fetch('/api/tasks', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newTask),
  });

  if (!response.ok) {
    throw new Error('Failed to add task');
  }

  return response.json();
};

// Delete an existing task
const deleteTask = async (taskId) => {
  const response = await fetch(`/api/tasks/${taskId}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Failed to delete task');
  }
};

//Edit Existing Task
const updateTask = async (updatedTask) => {
  const response = await fetch(`/api/tasks/${updatedTask.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedTask),
  });

  if (!response.ok) {
    throw new Error('Failed to update task');
  }

  return response.json();
};

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<MainLayout />}>
      <Route index element={<HomePage />} />

      <Route
        path="/tasks"
        element={<TasksPage />}
      />

      <Route
        path="/tasks/:id"
        element={<TaskPage deleteTask={deleteTask} />}
        loader={taskLoader}
      />

      <Route
        path="/add-task"
        element={<TaskForm onSubmit={addTask} mode="add" />}
      />

      <Route
      path="/tasks/edit/:id"
      element={<TaskForm onSubmit={updateTask} mode="edit"/>}
      loader={taskLoader}
      />

      <Route
        path="*"
        element={<NotFoundPage />}
      />
    </Route>
  )
);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;