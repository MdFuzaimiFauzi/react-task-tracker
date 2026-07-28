import React from 'react'
import { Link } from 'react-router-dom'
import { FaExclamationTriangle } from 'react-icons/fa'
import './NotFoundPage.css'

const NotFoundPage = () => {
  return (
    <>
        <section className="not-found">
        <FaExclamationTriangle className="not-found-icon"/>
        <h1 className="not-found-title">404 Not Found</h1>
        <p className="not-found-message">This page does not exist</p>
        <Link
            to="/"
            className="not-found-button"
            >Go Back</Link
        >
        </section> 
    </>
  )
}

export default NotFoundPage