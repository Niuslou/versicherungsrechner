import React from 'react';
import { Link } from 'react-router-dom';
import './App.css';

const Home = () => {
  return (
    <div className="home-container">
      <h1>Welcome to the Insurance Calculator</h1>
      <p>Calculate your insurance costs easily and quickly.</p>
      <Link to="/calculator">
        <button className="start-button">Start Calculator</button>
      </Link>
    </div>
  );
};

export default Home;
