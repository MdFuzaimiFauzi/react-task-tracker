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
            <div className="home-card developer-card">
              <h2 className="home-card-title">Frontend Development</h2>

              <p className="home-card-description">
                State management, API and component logic tasks
              </p>
              
              <Link
                to="/jobs"
                className="home-card-button developer-button"
                >
                  Browse Task
              </Link>

            </div>

            <div className="home-card designer-card">
              <h2 className="home-card-title">UI/UX Development</h2>
              
              <p className="home-card-description">
                Layouts, CSS styling and responsive design tasks
              </p>

              <Link
                to="/add-task"
                className="home-card-button employer-button"
              >
                  Add Task
              </Link>

            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default HomeCards;