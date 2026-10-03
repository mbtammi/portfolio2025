import React, { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import Lottie from 'lottie-react';
import catAnimation from '../Images/animations/animated-black-cat.json';
import './HomeIntro.css';

const CAT_MS = 1600;
const SPLIT_S = 0.8;
const EASE = [0.76, 0, 0.24, 1];

// Short curtain intro: the black cat sits on a blush disc, then two ink panels split away.
const HomeIntro = ({ onComplete }) => {
  const reduceMotion = useReducedMotion();
  const [split, setSplit] = useState(false);

  useEffect(() => {
    if (reduceMotion) {
      onComplete();
      return undefined;
    }
    const toSplit = window.setTimeout(() => setSplit(true), CAT_MS);
    const done = window.setTimeout(onComplete, CAT_MS + SPLIT_S * 1000 + 80);
    return () => {
      window.clearTimeout(toSplit);
      window.clearTimeout(done);
    };
  }, [reduceMotion, onComplete]);

  if (reduceMotion) return null;

  return (
    <div className="home-intro" aria-hidden="true">
      <motion.div
        className="home-intro__panel home-intro__panel--top"
        animate={{ y: split ? '-100%' : 0 }}
        transition={{ duration: SPLIT_S, ease: EASE }}
      />
      <motion.div
        className="home-intro__panel home-intro__panel--bottom"
        animate={{ y: split ? '100%' : 0 }}
        transition={{ duration: SPLIT_S, ease: EASE }}
      />
      <motion.div
        className="home-intro__stage"
        initial={{ opacity: 0, scale: 0.92 }}
        animate={split ? { opacity: 0, scale: 0.92 } : { opacity: 1, scale: 1 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
      >
        <div className="home-intro__disc">
          <Lottie animationData={catAnimation} loop className="home-intro__lottie" />
        </div>
      </motion.div>
    </div>
  );
};

export default HomeIntro;
