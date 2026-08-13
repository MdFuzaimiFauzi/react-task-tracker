import { useOutletContext } from 'react-router-dom';

import Hero from '../components/Hero.jsx';
import HomeCards from '../components/HomeCards.jsx';
import TaskListings from '../components/TaskListings.jsx';
import ViewAllTasks from '../components/ViewAllTasks.jsx';

const HomePage = () => {
  const { tasks, fetchTasks } = useOutletContext();

  return (
    <>
      <Hero />

      <HomeCards tasks={tasks} />

      <TaskListings
        isHome
        tasks={tasks}
        onTaskUpdated={fetchTasks}
      />

      <ViewAllTasks />
    </>
  );
};

export default HomePage;