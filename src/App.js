import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import ReactGA from 'react-ga4';
import Navigation from './Components/Navigation';
import './App.css';
import Home from './Components/Home';
import About from './Components/About';
import Youtube from './Components/Youtube';
import Links from './Components/Links';
import Projects from './Components/Projects';
import ProjectDetail from './Components/ProjectDetail';
import Contact from './Components/Contact';
import NotFound from './Components/NotFound';
import CoderType from './Components/CoderType';
import UGC from './Components/UGC';

const GA_MEASUREMENT_ID = process.env.REACT_APP_GA_TRACKING_ID;

if (GA_MEASUREMENT_ID) {
  ReactGA.initialize(GA_MEASUREMENT_ID);
}

const App = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!GA_MEASUREMENT_ID) return;
    const pagePath = window.location.hash.replace('#', '') || '/';
    ReactGA.send({ hitType: 'pageview', page: pagePath });
  }, [location.pathname]);

  const bare = location.pathname === '/links' || location.pathname === '/codertype';

  return (
    <div className="app">
      {!bare && <Navigation />}
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:slug" element={<ProjectDetail />} />
          <Route path="/youtube" element={<Youtube />} />
          <Route path="/ugc" element={<UGC />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/links" element={<Links />} />
          <Route path="/codertype" element={<CoderType />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
