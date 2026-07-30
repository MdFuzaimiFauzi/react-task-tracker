import React from 'react'
import { Link } from 'react-router-dom'
import Card from './Card.jsx'
import '../components/HomeCards.css'

const HomeCards = () => {
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

           {/* Developer Card */}
            <div className="home-card all-card">
              <h2 className="home-card-title">Frontend Development</h2>

              <p className="home-card-description">
                State management, API and component logic tasks
              </p>
              
              <Link
                to="/jobs"
                className="home-card-button all-button"
                >
                  Browse Task
              </Link>

            </div>

            {/* UI/UX Card */}
            <div className="home-card ui-card">
              <h2 className="home-card-title">UI/UX Development</h2>
              
              <p className="home-card-description">
                Layouts, CSS styling and responsive design tasks
              </p>

              <Link
                to="/add-task"
                className="home-card-button all-button"
              >
                  Add Task
              </Link>
            </div>

             {/* Weekly Progress Card */}
            <div className="home-card weekly-card">
              <h2 className="home-card-title">Weekly Progress</h2>

              <p className="home-card-description">
                Overview of weekly progress
              </p>
              
              <Link
                to="/jobs"
                className="home-card-button all-button"
                >
                  See More
              </Link>

            </div>


          </div>
        </div>
      </section>
    </>
  )
}

export default HomeCards;