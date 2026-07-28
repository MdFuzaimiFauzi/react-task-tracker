import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  FaCalendarAlt,
  FaCheckCircle,
  FaClock,
  FaExclamationCircle,
  FaTag,
} from 'react-icons/fa';

import './TaskItem.css';
import './Buttons.css';

const TaskItem = ({ task }) => {
    const navigate = useNavigate();
  const [showDescription, setShowDescription] = useState(false);

  const openTask = () => {
    navigate(`/tasks/${task.id}`);
  };

  const description = task.description ?? '';

  const displayedDescription =
    !showDescription && description.length > 90
      ? `${description.substring(0, 90)}...`
      : description;

  const priorityClass = task.priority
    ?.toLowerCase()
    .replaceAll(' ', '-');

  const statusClass = task.status
    ?.toLowerCase()
    .replaceAll(' ', '-');

  const getStatusIcon = () => {
    switch (task.status) {
      case 'Completed':
        return <FaCheckCircle />;

      case 'In Progress':
        return <FaClock />;

      default:
        return <FaExclamationCircle />;
    }
  };

  const formatDueDate = (dueDate) => {
    if (!dueDate) {
      return 'No due date';
    }

    const date = new Date(`${dueDate}T00:00:00`);

    return date.toLocaleDateString('en-MY', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  return (
    
    <article
      className="task-item"
      onClick={openTask}
      role="link"
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          openTask();
        }
      }}
    >
      <div className="task-item-content">
        <div className="task-item-header">
          <div className="task-item-badges">
            <span
              className={`task-priority task-priority-${priorityClass}`}
            >
              {task.priority}
            </span>

            <span
              className={`task-status task-status-${statusClass}`}
            >
              {getStatusIcon()}
              {task.status}
            </span>
          </div>

          <h3 className="task-item-title">
            {task.title}
          </h3>
        </div>

        <p className="task-item-description">
          {displayedDescription}
        </p>

        {description.length > 90 && (
          <button
            type="button"
            className="description-button"
            onClick={(event) => {
              event.stopPropagation();

              setShowDescription(
                (previousState) => !previousState
              );
            }}
          >
            {showDescription ? 'Show Less' : 'Show More'}
          </button>
        )}

        <div className="task-item-details">
          <div className="task-item-detail">
            <FaTag />
            <span>{task.category}</span>
          </div>

          <div className="task-item-detail">
            <FaCalendarAlt />

            <span>
              Due: {formatDueDate(task.dueDate)}
            </span>
          </div>
        </div>

        <div className="task-item-divider" />

        <div className="task-item-footer">
          <span className="task-item-created-date">
            Created: {formatDueDate(task.createdAt)}
          </span>
        </div>
      </div>
    </article>
   
  );
};

export default TaskItem;