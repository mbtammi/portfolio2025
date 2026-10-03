import React from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import './NotFound.css';

const NotFound = () => {
  const reduce = useReducedMotion();
  const enter = reduce
    ? {}
    : { initial: { opacity: 0, y: 16 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } };

  return (
    <motion.section className="notfound container" {...enter}>
      <p className="eyebrow">Error 404</p>
      <h1 className="notfound-code">
        <span className="visually-hidden">Page not found: </span>
        4<em className="accent">0</em>4
      </h1>
      <p className="notfound-text">This page wandered off. Probably chasing the cat.</p>
      <div className="notfound-actions">
        <Link to="/" className="btn btn--primary">Back home</Link>
        <Link to="/projects" className="btn btn--secondary">See my work</Link>
      </div>
    </motion.section>
  );
};

export default NotFound;
