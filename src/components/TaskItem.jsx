import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import {
  FaCalendarAlt,
  FaCheckCircle,
  FaClock,
  FaExclamationCircle,
  FaTag,
  FaRegCheckSquare,
} from 'react-icons/fa';

import './TaskItem.css';
import './Buttons.css';

const TaskItem = ({ task }) => {
  const navigate = useNavigate();
  const [currentStat, setCurrentStat] = useState(task.status);
  const [showDescription, setShowDescription] = useState(false);
  const [isArchived, setIsArchived] = useState(task.archived ?? false);
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
        return <FaRegCheckSquare />;

      case 'In Progress':
        return <FaClock />;

      default:
        return <FaExclamationCircle />;
    }
  }

  // const uncheckEvent = async (taskId) => {
  //   event.stopPropagation();
  //   try{
  //     const response = await fetch(`/api/tasks/$taskId}`, {
  //       )
  //   }
  //   }

  const uncheckEvent = async (taskId) => {
    event.stopPropagation();

    try{
      const response = await fetch(`/api/tasks/${taskId}`, {
        method: `PATCH`,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          status: 'Pending',
        }),
      });

      if (!response.ok)
        throw new Error ('Failed to undo task update');
              
    setCurrentStat('Pending')
    toast.success('Task returned as pending');
    }
    catch (error){
      console.error('Failed to mark test as pending: ',error);
    }
  }

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

  const checkEvent = async (taskId) => {
    console.log('TASK completed: ',task.id)

    const checkedEvent = {
      ...task,
      status: 'Completed',
    };

    try {
      const response = await fetch(`/api/tasks/${taskId}`, {
        method : `PATCH`,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          status: 'Completed',
        }),
      });

      if(!response.ok) {
          throw new Error('Failed to update the task');
      }

      setCurrentStat('Completed')
      toast.success('Task marked as completed')

    } catch (error) {
      console.error('Error updating task: ', error);
      toast.Error('Task progress cannot be updated')
    }
  };

  const archiveEvent = async (taskId) => {
    console.log('TASK archived: ',task.id)

    const archivedTask = {
      ...task,
      archived: true,
    }

    try {
      const response = await fetch(`/api/tasks/${taskId}`, {
        method: `PATCH`,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          archived: true,
        }),
      })

      if (!response.ok){
        throw new Error('Failed to archive the task')
      }
      setIsArchived(true)
    }
    catch (error) {
      console.error('Error archiving task: ',error);
    }
  }

  if (isArchived)
    return null;
  

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
            <span className={`task-priority task-priority-${priorityClass}`}>
              {task.priority}
            </span>

           {currentStat === 'Completed' ? (
              <button
                type="button"
                className="task-status task-status-completed task-status-button"
                onClick={(event) => {
                  event.stopPropagation();
                  uncheckEvent(task.id);
                }}
                title="Undo 'Completed'"
              >
                {getStatusIcon(currentStat)}
                {currentStat}
                </button>
            ) : (
              <span className={`task-status task-status-${currentStat
                .toLowerCase()
                .replaceAll(' ','-')}`}
              >
                {getStatusIcon(currentStat)}
                {currentStat}
              </span>

            )}
            <div/>
            
            <div className="task-item-actions">
              {currentStat !== 'Completed' && (
                <FaRegCheckSquare 
                className="check-button" 
                onClick={(event) => {event.stopPropagation();
                checkEvent(task.id);

              }}
              title = "Click to mark as 'Completed'"
              />
            )}
            
                <button type="button" className="archive-button"
                        onClick={(event) => {event.stopPropagation();
                          archiveEvent(task.id)
                        }}>
                  Archive
                </button>
              </div>   
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
                (prevState) => !prevState
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
            Created: {task.createdAt
                  ? formatDueDate(task.createdAt)
                  : 'Unknown'}
          </span>
        </div>
      </div>
    </article>
   
  );
};

export default TaskItem;