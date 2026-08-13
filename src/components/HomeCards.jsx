import React from "react";
import { Link } from "react-router-dom";
import "../components/HomeCards.css";
import TaskPriorityChart from "./TaskPriorityChart.jsx";
import TaskStatusChart from "./TaskStatusChart.jsx";
import TaskCompletionTrend from "./TaskCompletionTrend.jsx";

const HomeCards = ({ tasks }) => {

  // const fetchTasks = async () => {
  //   const response = await fetch("/api/tasks");
  //   const data = await response.json();

  //   setTasks(data);
  // };

  // useEffect(() => {
  //   fetchTasks();
  // }, []);

  return (
    <>
      <section className="home-cards-section">
        <div className="home-cards-container">
          <div className="home-cards-grid">

            {/* Overview Card */}
            <div className="home-card overview-card">
              <h2 className="home-card-title">Overview</h2>

              <p className="home-card-description">
                Show all task details
              </p>

              <Link
                to="/jobs"
                className="home-card-button all-button"
              >
                See Detail
              </Link>
            </div>

            {/* Task Status Chart */}
            <div className="home-card all-card">
              <h2 className="home-card-title">
                Task Status Overview
              </h2>

              <p className="home-card-description"></p>

              <TaskStatusChart tasks={tasks} />
            </div>

            {/* Task Priority Chart */}
            <div className="home-card priority-overview-card">
              <h2 className="home-card-title">
                Task Priority Overview
              </h2>

              <p className="home-card-description">
                {/* Current task distribution by priority */}
              </p>

              <TaskPriorityChart tasks={tasks} />
            </div>

            {/* Task Completion Trend Card */}
            <div className="home-card completion-trend-card">
              <h2 className="home-card-title">
                Task Completion Trend
              </h2>

              <p className="home-card-description">
              </p>

              <TaskCompletionTrend tasks={tasks}/>

              {/* <Link
                to="/jobs"
                className="home-card-button all-button"
              >
                See More
              </Link> */}
            </div>

          </div>
        </div>
      </section>
    </>
  );
};

export default HomeCards;