import {
  Link,
  useLoaderData,
  useNavigate,
} from 'react-router-dom';

import {
  FaArrowLeft,
  FaCalendarAlt,
  FaCheckCircle,
  FaClock,
  FaExclamationCircle,
  FaTag,
} from 'react-icons/fa';

import { toast } from 'react-toastify';

import './TaskPage.css';

const TaskPage = ({ deleteTask }) => {
  const task = useLoaderData();
  const navigate = useNavigate();

  const formatDate = (value) => {
    if (!value) {
      return 'Unknown';
    }
    const date = new Date(value);
    return date.toLocaleDateString('en-MY', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

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

  const handleDeleteClick = async () => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete "${task.title}"?`
    );

    if (!confirmDelete) {
      return;
    }

    try {
      await deleteTask(task.id);

      toast.success('Task deleted successfully!');
      navigate('/tasks');
    } catch (error) {
      console.error('Error deleting task:', error);
      toast.error('Failed to delete task. Please try again.');
    }
  };

  return (
    <>
      <section className="task-back-section">
        <div className="task-page-container task-back-container">
          <Link
            to="/tasks"
            className="task-back-link"
          >
            <FaArrowLeft className="task-back-icon" />
            Back to Task List
          </Link>
        </div>
      </section>

      <section className="task-details-section">
        <div className="task-page-container task-details-container">
          <div className="task-details-layout">
            <main className="task-details-main">
              <article className="task-summary-card">
                <div className="task-summary-badges">
                  <span
                    className={`task-priority task-priority-${task.priority
                      ?.toLowerCase()
                      .replaceAll(' ', '-')}`}
                  >
                    {task.priority}
                  </span>

                  <span
                    className={`task-status task-status-${task.status
                      ?.toLowerCase()
                      .replaceAll(' ', '-')}`}
                  >
                    {getStatusIcon()}
                    {task.status}
                  </span>
                </div>

                <h1 className="task-title">
                  {task.title}
                </h1>

                <div className="task-category">
                  <FaTag className="task-category-icon" />

                  <span>
                    {task.category}
                  </span>
                </div>
              </article>

              <article className="task-description-card">
                <h2 className="task-section-title">
                  Task Description
                </h2>

                <p className="task-paragraph">
                  {task.description}
                </p>
              </article>
            </main>

            <aside className="task-details-sidebar">
              <article className="task-information-card">
                <h2 className="task-information-heading">
                  Task Information
                </h2>

                <div className="task-information-item">
                  <FaCalendarAlt className="task-information-icon" />

                  <div>
                    <span className="task-information-label">
                      Due Date
                    </span>

                    <p className="task-information-value">
                      {formatDate(task.due_date)}
                    </p>
                  </div>
                </div>

                <div className="task-information-item">
                  <FaCalendarAlt className="task-information-icon" />

                  <div>
                    <span className="task-information-label">
                      Created Date
                    </span>

                    <p className="task-information-value">
                      {formatDate(task.created_at)}
                    </p>
                  </div>
                </div>
              </article>

              <article className="manage-task-card">
                <h2 className="manage-task-heading">
                  Manage Task
                </h2>

                <Link
                  to={`/tasks/edit/${task.id}`}
                  className="manage-task-button edit-task-button"
                >
                  Edit Task
                </Link>

                <button
                  type="button"
                  className="manage-task-button delete-task-button"
                  onClick={handleDeleteClick}
                >
                  Delete Task
                </button>
              </article>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
};

const taskLoader = async ({ params }) => {
  const response = await fetch(`/api/tasks/${params.id}`);

  if (!response.ok) {
    throw new Response('Task not found', {
      status: response.status,
    });
  }

  return response.json();
};

export { TaskPage as default, taskLoader };