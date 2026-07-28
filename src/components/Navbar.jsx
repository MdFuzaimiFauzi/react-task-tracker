import { NavLink } from 'react-router-dom';

import logo from '../assets/images/logo.png';

import './Navbar.css';

const Navbar = () => {
  const getLinkClass = ({ isActive }) => {
    return isActive
      ? 'navbar-link navbar-link-active'
      : 'navbar-link';
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-content">
          <div className="navbar-main">
            <NavLink
              className="navbar-brand"
              to="/"
            >
              <img
                className="navbar-logo"
                src={logo}
                alt="React Task Tracker logo"
              />

              <span className="navbar-title">
                React.Js Task 
              </span>
            </NavLink>

            <div className="navbar-menu">
              <div className="navbar-links">
                <NavLink
                  to="/"
                  className={getLinkClass}
                >
                  Home
                </NavLink>

                <NavLink
                  to="/tasks"
                  className={getLinkClass}
                >
                  Tasks
                </NavLink>

                <NavLink
                  to="/add-task"
                  className={getLinkClass}
                >
                  Add Task
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;