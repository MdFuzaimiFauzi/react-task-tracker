import TaskItem from './TaskItem.jsx';
import './TaskListings.css';

const TaskListings = ({
  isHome = false,
  tasks = [],
  onTaskUpdated,
}) => {
  const showTasks = isHome
    ? tasks.slice(0, 4)
    : tasks;

  return (
    <section className="task-listings">
      <div className="task-listings-container">

        <h2 className="task-listings-title">
          {isHome ? 'Recent Tasks' : 'Browse Tasks'}
        </h2>

        {showTasks.length === 0 && (
          <div className="task-listings-state">
            <p className="task-listings-empty">
              No tasks found.
            </p>
          </div>
        )}

        {showTasks.length > 0 && (
          <div className="task-listings-grid">
            {showTasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                onTaskUpdated={onTaskUpdated}
              />
            ))}
          </div>
        )}

      </div>
    </section>
  );
};

export default TaskListings;