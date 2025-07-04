import React, { useState, useEffect } from 'react';
import EarningsDisplay from './EarningsDisplay';
import './ChoresList.css';

const STORAGE_KEY = 'dishes-tracker-completed-days';
const ALLOWED_DAYS = [0, 3, 4]; // Sunday (0), Wednesday (3), Thursday (4)

const ChoresList = () => {
  const [completedDays, setCompletedDays] = useState(() => {
    // Load saved data from localStorage on initial render
    const savedData = localStorage.getItem(STORAGE_KEY);
    return savedData ? JSON.parse(savedData) : {};
  });
  
  const [currentDate, setCurrentDate] = useState(new Date());
  const [shakeDay, setShakeDay] = useState(null);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  // Save to localStorage whenever completedDays changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(completedDays));
  }, [completedDays]);

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    return { daysInMonth, firstDayOfMonth };
  };

  const formatDate = (year, month, day) => {
    return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  };

  const isDayAllowed = (day) => {
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    return ALLOWED_DAYS.includes(date.getDay());
  };

  const handleDayClick = (day) => {
    if (isDayAllowed(day)) {
      const dateStr = formatDate(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        day
      );
      setCompletedDays(prev => ({
        ...prev,
        [dateStr]: !prev[dateStr]
      }));
    } else {
      // Trigger vibration if available
      if (navigator.vibrate) {
        navigator.vibrate(200);
      }
      
      // Trigger shake animation
      setShakeDay(day);
      setTimeout(() => setShakeDay(null), 500); // Remove shake class after animation
    }
  };

  const getMonthName = (date) => {
    return date.toLocaleString('default', { month: 'long' });
  };

  const changeMonth = (offset) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + offset);
    setCurrentDate(newDate);
  };

  const clearAllData = () => {
    setCompletedDays({});
    localStorage.removeItem(STORAGE_KEY);
    setShowConfirmDialog(false);
  };

  const { daysInMonth, firstDayOfMonth } = getDaysInMonth(currentDate);
  const totalCompletedDays = Object.values(completedDays).filter(Boolean).length;

  const renderCalendarDays = () => {
    const days = [];
    const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    // Render week days header
    weekDays.forEach((day, index) => {
      days.push(
        <div 
          key={`header-${day}`} 
          className={`calendar-day header ${ALLOWED_DAYS.includes(index) ? 'allowed-day' : 'forbidden-day'}`}
        >
          {day}
        </div>
      );
    });

    // Render the days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = formatDate(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        day
      );
      const isCompleted = completedDays[dateStr];
      const isToday = new Date().toDateString() === new Date(dateStr).toDateString();
      const isAllowed = isDayAllowed(day);

      days.push(
        <div
          key={day}
          className={`calendar-day 
            ${isCompleted ? 'completed' : ''} 
            ${isToday ? 'today' : ''} 
            ${!isAllowed ? 'forbidden' : ''}
            ${shakeDay === day ? 'shake' : ''}`}
          onClick={() => handleDayClick(day)}
          style={{ gridColumnStart: day === 1 ? firstDayOfMonth + 1 : 'auto' }}
        >
          <span className="day-number">{day}</span>
          {isCompleted && <span className="earned-amount">+$7</span>}
        </div>
      );
    }

    return days;
  };

  return (
    <div className="chores-list">
      <h2>Monthly Dishes Calendar</h2>
      <p className="available-days">Available days: Sunday, Wednesday, Thursday</p>
      
      <div className="main-content">
        <div className="calendar-container">
          <div className="calendar-header">
            <button onClick={() => changeMonth(-1)}>👈</button>
            <h3>{getMonthName(currentDate)} {currentDate.getFullYear()}</h3>
            <button onClick={() => changeMonth(1)}>👉</button>
          </div>

          <div className="calendar-grid">
            {renderCalendarDays()}
          </div>

          <button className="clear-data-button" onClick={() => setShowConfirmDialog(true)}>
            Clear All Data
          </button>
        </div>

        <EarningsDisplay completedDays={totalCompletedDays} />
      </div>

      {showConfirmDialog && (
        <div className="dialog-overlay">
          <div className="dialog">
            <h3>Clear All Data</h3>
            <p>Are you sure you want to clear all completion data? This action cannot be undone.</p>
            <div className="dialog-buttons">
              <button className="dialog-button cancel" onClick={() => setShowConfirmDialog(false)}>
                Cancel
              </button>
              <button className="dialog-button confirm" onClick={clearAllData}>
                Yes, Clear Data
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChoresList; 