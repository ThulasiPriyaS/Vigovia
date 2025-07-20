import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import VigoviaHeader from './components/header';
import HeroPage from './components/hero';
import SpringReadMore from './components/SpringReadMore';
import SeasonalInfo from './components/SeasonalInfo';
import Login from './components/Login';
import Signup from './components/Signup';
import ComingSoon from './components/ComingSoon';
import './App.css';

function App() {
  return (
    <div className="App">
      <VigoviaHeader />
      <Router>
        <Routes>
          <Route path="/" element={<HeroPage />} />
          <Route path="/spring/readmore" element={<SpringReadMore />} />
          <Route path="/seasonal-info" element={<SeasonalInfo />} />
          {/* Future: <Route path="/about" element={<AboutPage />} /> */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/malaysia" element={<ComingSoon />} />
          <Route path="/srilanka" element={<ComingSoon />} />
          <Route path="/paris" element={<ComingSoon />} />
          <Route path="/barcelona" element={<ComingSoon />} />
          <Route path="/rome" element={<ComingSoon />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
