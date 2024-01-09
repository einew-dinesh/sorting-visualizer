// Bar.jsx

import React from 'react';
import './bar.css';

const Bar = ({ height, color }) => (
  <div
    className={`bar ${color}`}
    style={{
      height: `${height}px`,
      width: '20px',
    }}
  ></div>
);

export default Bar;
