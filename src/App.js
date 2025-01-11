import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navigation from './Components/Navigation';
import './App.css';
import Home from './Components/Home';
import About from './Components/About';
import Youtube from './Components/Youtube';
import Links from './Components/Links'
import Projects from './Components/Projects'

const App = () => {
  const location = useLocation(); // Access the current location (path)

  return (
    <div className={`app-container ${location.pathname === '/' ? 'home-style' : ''} 
                                          ${location.pathname === '/about' ? 'about-style' : ''} 
                                          ${location.pathname === '/projects' ? 'projects-style' : ''} 
                                          ${location.pathname === '/youtube' ? 'youtube-style' : ''} 
                                          ${location.pathname === '/links' ? 'links-style' : ''}`}>
        <Navigation />
        <Routes>
          <Route path="/" element={ <Home /> } />
          <Route path="/about" element={ <About />} />
          <Route path="/projects" element={<div><Projects /></div>} />
          <Route path="/youtube" element={ <Youtube /> } />
          <Route path="/links" element={<div><Links /></div>} />
        </Routes>
    </div>
  );
};

export default App;
