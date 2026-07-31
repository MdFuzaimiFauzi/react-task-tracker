import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import Navbar from '../components/Navbar.jsx';

import 'react-toastify/dist/ReactToastify.css';

const MainLayout = () => {
  return (
    <>
      <Navbar />

      <main>
        <Outlet />
      </main>

      <ToastContainer
        position="bottom-right"
        autoClose={2500}
        hideProgressBar={true}
        newestOnTop={true}
        theme="dark"
        closeOnClick
        pauseOnHover
        draggable
        
      />
    </>
  );
};

export default MainLayout;