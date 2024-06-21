import React from 'react';
import { Link } from 'react-router-dom';
import './App.css';

const Home = () => {
  return (
    <div>
        <div>
            <nav className="navbar">
                <div className="navbar-container">
                <Link to="/" className="navbar-logo">Insurance Calculator</Link>
                <ul className="navbar-menu">
                    <li className="navbar-item"><Link to="/">Home</Link></li>
                    <li className="navbar-item"><a href="#">Link</a></li>
                    <li className="navbar-item"><a href="#">Dropdown</a></li>
                </ul>
                </div>
            </nav>
        </div>
        <div className="home-container">
            <h1>Nils' Versicherungsrechner</h1>
            <p>Berechnen Sie Ihre Versicherung (am besten bei einem anderen Rechner, wie z.B. Comparis).</p>
            <Link to="/calculator">
                <button className="start-button">Berechnung starten</button>
            </Link>
        </div>
    </div>
  );
};

export default Home;
