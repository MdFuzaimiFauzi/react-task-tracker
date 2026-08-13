import { useOutletContext } from 'react-router-dom'; 
import TaskListings from '../components/TaskListings.jsx';

const TasksPage = () => {
  const { tasks, fetchasks } = useOutletContext();

  return (
    <main className="tasks-page">
      <TaskListings
        tasks={tasks}
        onTaskUpdated={fetchasks}
      />
    </main>
  )
};

export default TasksPage;