import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import ReactGA from 'react-ga4';
import Navigation from './Components/Navigation';
import './App.css';
import Home from './Components/Home';
import About from './Components/About';
import Youtube from './Components/Youtube';
import Links from './Components/Links'
import Projects from './Components/Projects'
import CoderType from './Components/CoderType'
// import UusioperheGame from './Components/UusioperheGame';

// Initialize Google Analytics with your Measurement ID
const TRACKING_ID = process.env.REACT_APP_GA_TRACKING_ID; 
ReactGA.initialize(TRACKING_ID);

const App = () => {
  const location = useLocation();

  useEffect(() => {
    // Send a page view event on route change
    const pagePath = window.location.hash.replace("#", "") || "/";
    ReactGA.send({ hitType: "pageview", page: pagePath });
  }, [location]);

  return (
    <div className="app-container">
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/youtube" element={<Youtube />} />
        <Route path="/links" element={<Links />} />
        <Route path="/codertype" element={<CoderType />} />
        {/* <Route path="/uusioperhe" element={<UusioperheGame />} /> */}
      </Routes>
    </div>
  );
};

export default App;
