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
      const apiUrl = isHome
        ? '/api/tasks?_page=1&_per_page=4'
        : '/api/tasks';

      try {
        setLoading(true);
        setError('');

        const response = await fetch(apiUrl);

        if (!response.ok) {
          throw new Error(`Failed to fetch tasks: ${response.status}`);
        }

        const result = await response.json();

        /*
          JSON Server pagination may return:

          {
            first: 1,
            prev: null,
            next: 2,
            last: 2,
            pages: 2,
            items: 5,
            data: [...]
          }

          A normal request returns an array directly.
        */
        const taskData = Array.isArray(result)
          ? result
          : result.data ?? [];

        setTasks(taskData);
      } catch (error) {
        console.error('Error fetching tasks:', error);
        setError('Unable to load tasks. Please try again.');
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