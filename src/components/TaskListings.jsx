import { useEffect, useState } from 'react';

import TaskItem from './TaskItem.jsx';
import Spinner from './Spinner.jsx';

import './TaskListings.css';

const TaskListings = ({ isHome = false }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setLoading(true);
        setError('');

        //const apiUrl = 'api/tasks';
        //const apiUrl = '/api/oracle/tasks';
        const apiUrl = '/api/sqlserver/tasks'
        const response = await fetch(apiUrl);

        if (!response.ok) {
          throw new Error(`Failed to fetch tasks: ${response.status}`);
        }

        const data = await response.json();

        const showTasks = isHome?
        data.slice(0, 4) : data;

        setTasks(showTasks);
      } catch (error) {
        setError('Failed to fetch tasks');
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [isHome]);
 
  return (
    <section className="task-listings">
      <div className="task-listings-container">
        <h2 className="task-listings-title">
          {isHome ? 'Recent Tasks' : 'Browse Tasks'}
        </h2>

        {loading && (
          <div className="task-listings-state">
            <Spinner loading={loading} />
          </div>
        )}

        {!loading && error && (
          <div className="task-listings-state">
            <p className="task-listings-error">{error}</p>
          </div>
        )}

        {!loading && !error && tasks.length === 0 && (
          <div className="task-listings-state">
            <p className="task-listings-empty">
              No tasks found.
            </p>
          </div>
        )}

        {!loading && !error && tasks.length > 0 && (
          <div className="task-listings-grid">
            {tasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default TaskListings;