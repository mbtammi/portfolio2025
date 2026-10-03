import React from 'react';

// direction: 'right' (default) | 'out' (external, up-right) | 'left' | 'down'
const PATHS = {
  right: 'M5 12h14M13 6l6 6-6 6',
  left: 'M19 12H5M11 18l-6-6 6-6',
  out: 'M7 17L17 7M8 7h9v9',
  down: 'M12 4v12M6 10l6 6 6-6M5 20h14',
};

const Arrow = ({ direction = 'right', size = 16 }) => (
  <svg className="arrow" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d={PATHS[direction]} />
  </svg>
);

export default Arrow;
