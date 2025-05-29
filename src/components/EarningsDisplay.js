import React from 'react';
import './EarningsDisplay.css';

const PAYMENT_PER_DAY = 7;

const EarningsDisplay = ({ completedDays }) => {
  const totalEarned = completedDays * PAYMENT_PER_DAY;

  return (
    <div className="earnings-display">
      <div className="earnings-card">
        <h3>Money Earned</h3>
        <div className="amount">${totalEarned}</div>
        <div className="rate">($7 per day)</div>
      </div>
    </div>
  );
};

export default EarningsDisplay; 