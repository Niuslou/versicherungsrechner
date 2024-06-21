import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import InsuranceCalculator from './InsuranceCalculator';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/calculator" element={<InsuranceCalculator />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
