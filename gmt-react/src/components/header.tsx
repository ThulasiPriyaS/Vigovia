"use client";
import React, { useState, useEffect } from 'react';
import './header.css';
import vigoviaLogo from '../assets/Logo.png';
import { useNavigate } from 'react-router-dom';

const navItems = [
  { label: 'Instant Visa', options: ['Tourist', 'Business', 'Student'] },
  { label: 'One Week Visa', options: ['Tourist', 'Business'] },
  { label: 'One Month Visa', options: ['Tourist', 'Business', 'Work'] },
];
const countries = ['India', 'USA', 'UK', 'Australia'];
const languages = ['EN', 'FR', 'ES', 'DE'];

function Dropdown({ label, options }: { label: string, options: string[] }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="dropdown" onMouseLeave={() => setOpen(false)}>
      <button className="nav-btn" onClick={() => setOpen(!open)}>{label} <span>▼</span></button>
      {open && (
        <div className="dropdown-content">
          {options.map(opt => <div key={opt} className="dropdown-item">{opt}</div>)}
        </div>
      )}
    </div>
  );
}

export default function VigoviaHeader() {
  const [countryOpen, setCountryOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const isLoggedIn = false; // Placeholder for login state
  const navigate = useNavigate();

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }
  }, [darkMode]);

  return (
    <header className="vigovia-header">
      <div className="header-inner">
        <div className="logo-area">
          <img src={vigoviaLogo} alt="Vigovia logo" className="vigovia-logo-img" />
        </div>
        <nav className="nav-bar">
          {navItems.map(item => <Dropdown key={item.label} label={item.label} options={item.options} />)}
          <div className="dropdown" onMouseLeave={() => setCountryOpen(false)}>
            <button className="nav-btn" onClick={() => setCountryOpen(!countryOpen)}>Country <span>▼</span></button>
            {countryOpen && (
              <div className="dropdown-content">
                {countries.map(c => <div key={c} className="dropdown-item">{c}</div>)}
              </div>
            )}
          </div>
          <div className="dropdown" onMouseLeave={() => setLangOpen(false)}>
            <button className="nav-btn" onClick={() => setLangOpen(!langOpen)}>Language <span>▼</span></button>
            {langOpen && (
              <div className="dropdown-content">
                {languages.map(l => <div key={l} className="dropdown-item">{l}</div>)}
              </div>
            )}
          </div>
        </nav>
        <div className="header-actions">
          <button className="theme-toggle-btn" onClick={() => setDarkMode(!darkMode)} title="Toggle dark/light mode">
            {darkMode ? (
              // Moon icon for dark mode
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M17 13.5A7 7 0 0 1 7 3a7 7 0 1 0 10 10.5z" fill="#f7c948" stroke="#222" strokeWidth="1.5" />
              </svg>
            ) : (
              // Sun icon for light mode
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="10" cy="10" r="5" fill="#f7c948" stroke="#222" strokeWidth="1.5" />
                <g stroke="#222" strokeWidth="1.5">
                  <line x1="10" y1="2" x2="10" y2="4" />
                  <line x1="10" y1="16" x2="10" y2="18" />
                  <line x1="2" y1="10" x2="4" y2="10" />
                  <line x1="16" y1="10" x2="18" y2="10" />
                  <line x1="4.93" y1="4.93" x2="6.34" y2="6.34" />
                  <line x1="13.66" y1="13.66" x2="15.07" y2="15.07" />
                  <line x1="4.93" y1="15.07" x2="6.34" y2="13.66" />
                  <line x1="13.66" y1="6.34" x2="15.07" y2="4.93" />
                </g>
              </svg>
            )}
          </button>
          <button className="unflash-btn">{isLoggedIn ? 'Unflash' : 'User'}</button>
          <button className="login-btn">Login / Sign Up</button>
          <button style={{ marginLeft: 12, background: '#541c9c', color: 'white', border: 'none', borderRadius: 6, padding: '8px 18px', fontWeight: 600, cursor: 'pointer' }} onClick={() => navigate('/itinerary-generator')}>
            Itinerary PDF Generator
          </button>
        </div>
      </div>
    </header>
  );
}