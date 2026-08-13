import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import Navbar from '../components/Navbar.jsx';

import 'react-toastify/dist/ReactToastify.css';

const MainLayout = () => {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    const response = await fetch('/api/tasks');
    const data = await response.json();

    console.log('FETCHED TASKS:', data);

    setTasks(data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <>
      <Navbar />

      <main>
        <Outlet
          context={{
            tasks,
            fetchTasks,
          }}
        />
      </main>

      <ToastContainer
        position="bottom-right"
        autoClose={2500}
        hideProgressBar={true}
        newestOnTop={false}
        theme="dark"
        closeOnClick
        pauseOnHover
        draggable
      />
    </>
  );
};

export default MainLayout;