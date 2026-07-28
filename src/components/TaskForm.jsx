import { useEffect, useState } from 'react';

import './TaskForm.css';

const TaskForm = ({
  initialTask = null,
  onSubmit,
  submitting = false,
}) => {
  const isEditMode = Boolean(initialTask);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Development');
  const [priority, setPriority] = useState('Medium');
  const [status, setStatus] = useState('Not Started Yet');
  const [dueDate, setDueDate] = useState('');

  useEffect(() => {
    if (!initialTask) {
      return;
    }

    setTitle(initialTask.title ?? '');
    setDescription(initialTask.description ?? '');
    setCategory(initialTask.category ?? 'Development');
    setPriority(initialTask.priority ?? 'Medium');
    setStatus(initialTask.status ?? 'Not Started Yet');
    setDueDate(initialTask.dueDate ?? '');
  }, [initialTask]);

  const submitForm = async (event) => {
    event.preventDefault();

    const taskData = {
      title: title.trim(),
      description: description.trim(),
      category,
      priority,
      status,
      dueDate,
    };

    await onSubmit(taskData);
  };

  return (
    <section className="add-task-page">
      <div className="add-task-container">
        <div className="add-task-card">
          <form onSubmit={submitForm}>
            <h1 className="add-task-title">
              {isEditMode ? 'Edit Task' : 'Add Task'}
            </h1>

            <div className="form-group">
              <label
                htmlFor="title"
                className="form-label"
              >
                Task Title
              </label>

              <input
                type="text"
                id="title"
                name="title"
                className="form-control"
                placeholder="Example: Complete React Task Tracker"
                required
                value={title}
                onChange={(event) => {
                  setTitle(event.target.value);
                }}
              />
            </div>

            <div className="form-group">
              <label
                htmlFor="description"
                className="form-label"
              >
                Description
              </label>

              <textarea
                id="description"
                name="description"
                className="form-control"
                rows="5"
                placeholder="Describe what needs to be completed"
                required
                value={description}
                onChange={(event) => {
                  setDescription(event.target.value);
                }}
              />
            </div>

            <div className="form-group">
              <label
                htmlFor="category"
                className="form-label"
              >
                Category
              </label>

              <select
                id="category"
                name="category"
                className="form-control"
                required
                value={category}
                onChange={(event) => {
                  setCategory(event.target.value);
                }}
              >
                <option value="Development">Development</option>
                <option value="Learning">Learning</option>
                <option value="Portfolio">Portfolio</option>
                <option value="Work">Work</option>
                <option value="Personal">Personal</option>
              </select>
            </div>

            <div className="form-group">
              <label
                htmlFor="priority"
                className="form-label"
              >
                Priority
              </label>

              <select
                id="priority"
                name="priority"
                className="form-control"
                required
                value={priority}
                onChange={(event) => {
                  setPriority(event.target.value);
                }}
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
                <option value="Urgent">Urgent</option>
              </select>
            </div>

            <div className="form-group">
              <label
                htmlFor="status"
                className="form-label"
              >
                Status
              </label>

              <select
                id="status"
                name="status"
                className="form-control"
                required
                value={status}
                onChange={(event) => {
                  setStatus(event.target.value);
                }}
              >
                <option value="Not Started Yet">
                  Not Started Yet
                </option>

                <option value="Pending">
                  Pending
                </option>

                <option value="In Progress">
                  In Progress
                </option>

                <option value="Completed">
                  Completed
                </option>
              </select>
            </div>

            <div className="form-group">
              <label
                htmlFor="dueDate"
                className="form-label"
              >
                Due Date
              </label>

              <input
                type="date"
                id="dueDate"
                name="dueDate"
                className="form-control"
                required
                value={dueDate}
                onChange={(event) => {
                  setDueDate(event.target.value);
                }}
              />
            </div>

            <button
              type="submit"
              className="add-task-button"
              disabled={submitting}
            >
              {submitting
                ? isEditMode
                  ? 'Updating Task...'
                  : 'Adding Task...'
                : isEditMode
                  ? 'Update Task'
                  : 'Add Task'}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default TaskForm;