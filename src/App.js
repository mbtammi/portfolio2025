import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navigation from './Components/Navigation';
import './App.css';
import Home from './Components/Home';
import About from './Components/About';
import Youtube from './Components/Youtube';
import Links from './Components/Links'
import Projects from './Components/Projects'
import CoderType from './Components/CoderType'

const App = () => {
  return (
    <div className="app-container">
        <Navigation />
        <Routes>
          <Route path="/" element={ <Home /> } />
          <Route path="/about" element={ <About />} />
          <Route path="/projects" element={<div><Projects /></div>} />
          <Route path="/youtube" element={ <Youtube /> } />
          <Route path="/links" element={<div><Links /></div>} />
          <Route path="/codertype" element={<div><CoderType /></div>} />
        </Routes>
    </div>
  );
};

export default App;
