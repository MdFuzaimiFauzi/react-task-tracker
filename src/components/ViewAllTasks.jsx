import { Link } from 'react-router-dom';
import './ViewAllTasks.css'

import './Buttons.css';

const ViewAllTasks = () => {
  return (
    <section className="view-all-tasks">
      <Link to="/tasks" className="view-all-tasks-button">
        View All Tasks
      </Link>
    </section>
  );
};

export default ViewAllTasks;