import React, { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import Lottie from 'lottie-react';
import catAnimation from '../Images/animations/animated-black-cat.json';
import './HomeIntro.css';

const CAT_MS = 2000;
const SPLIT_S = 0.95;

const HomeIntro = ({ onComplete }) => {
  const reduceMotion = useReducedMotion();
  const [phase, setPhase] = useState('cat');
  const doneRef = useRef(false);

  useEffect(() => {
    if (reduceMotion) {
      onComplete();
      return undefined;
    }
    const t = window.setTimeout(() => setPhase('split'), CAT_MS);
    return () => window.clearTimeout(t);
  }, [reduceMotion, onComplete]);

  useEffect(() => {
    if (phase !== 'split' || reduceMotion) return undefined;
    const id = window.setTimeout(() => {
      if (doneRef.current) return;
      doneRef.current = true;
      onComplete();
    }, SPLIT_S * 1000 + 80);
    return () => window.clearTimeout(id);
  }, [phase, reduceMotion, onComplete]);

  if (reduceMotion) {
    return null;
  }

  const split = phase === 'split';

  return (
    <div className="home-intro" role="presentation" aria-hidden="true">
      <motion.div
        className="home-intro-panel home-intro-panel--top"
        initial={{ y: 0 }}
        animate={split ? { y: '-100%' } : { y: 0 }}
        transition={{ duration: SPLIT_S, ease: [0.76, 0, 0.24, 1] }}
      />
      <motion.div
        className="home-intro-panel home-intro-panel--bottom"
        initial={{ y: 0 }}
        animate={split ? { y: '100%' } : { y: 0 }}
        transition={{ duration: SPLIT_S, ease: [0.76, 0, 0.24, 1] }}
      />
      <motion.div
        className="home-intro-lottie-wrap"
        initial={{ opacity: 1 }}
        animate={{ opacity: split ? 0 : 1 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
      >
        <Lottie animationData={catAnimation} loop className="home-intro-lottie" aria-hidden />
      </motion.div>
    </div>
  );
};

export default HomeIntro;
