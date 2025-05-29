import React, { useState, useEffect } from 'react';
import './EarningsDisplay.css';

const PAYMENT_PER_DAY = 7;
const DEFAULT_GOAL = 300;

const EarningsDisplay = ({ completedDays }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [goalAmount, setGoalAmount] = useState(() => {
    const savedGoal = localStorage.getItem('dishesGoalAmount');
    return savedGoal ? Number(savedGoal) : DEFAULT_GOAL;
  });
  const [newGoal, setNewGoal] = useState('');
  const [error, setError] = useState('');

  const totalEarned = completedDays * PAYMENT_PER_DAY;

  useEffect(() => {
    localStorage.setItem('dishesGoalAmount', goalAmount.toString());
  }, [goalAmount]);

  const handleGoalChange = () => {
    const numberGoal = Number(newGoal);
    if (!newGoal || isNaN(numberGoal) || numberGoal <= 0) {
      setError('Please enter a valid number greater than 0');
      return;
    }
    setGoalAmount(numberGoal);
    setNewGoal('');
    setError('');
    setIsDialogOpen(false);
  };

  const openDialog = () => {
    console.log('Opening dialog');
    setIsDialogOpen(true);
  };

  return (
    <>
      <div className="earnings-display">
        <div className="earnings-card">
          <h3>Money Earned</h3>
          <div className="amount">${totalEarned}</div>
          <div className="rate">($7 per day)</div>
          <div className="goal">Goal: ${goalAmount}</div>
          <button 
            type="button"
            className="change-goal-btn"
            onClick={openDialog}
          >
            Change Goal
          </button>
        </div>
      </div>

      {isDialogOpen && (
        <div className="dialog-overlay" onClick={(e) => {
          if (e.target === e.currentTarget) {
            setIsDialogOpen(false);
            setNewGoal('');
            setError('');
          }
        }}>
          <div className="dialog">
            <h3>Change Goal</h3>
            <p>Enter your new goal amount:</p>
            <input
              type="number"
              value={newGoal}
              onChange={(e) => setNewGoal(e.target.value)}
              placeholder="Enter amount"
              className="goal-input"
              min="1"
            />
            {error && <p className="error-message">{error}</p>}
            <div className="dialog-buttons">
              <button 
                type="button"
                className="dialog-button confirm"
                onClick={handleGoalChange}
              >
                Confirm
              </button>
              <button 
                type="button"
                className="dialog-button cancel"
                onClick={() => {
                  setIsDialogOpen(false);
                  setNewGoal('');
                  setError('');
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EarningsDisplay; 