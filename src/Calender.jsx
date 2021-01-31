import React, { useEffect, useState } from 'react';
import './clock.scss';

const Clock = () => {
 
  return (
    <div className="clock">
      <div className="clock__location">{location}</div>
      <div className="clock__time">{time.toLocaleTimeString('en-US')}</div>
    </div>
  );
};

export default Clock;
