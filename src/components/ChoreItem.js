import React from 'react';
import './ChoreItem.css';

const ChoreItem = ({ chore, onToggle }) => {
  return (
    <div className={`chore-item ${chore.completed ? 'completed' : ''}`}>
      <div className="chore-content">
        <input
          type="checkbox"
          checked={chore.completed}
          onChange={() => onToggle(chore.id)}
          className="chore-checkbox"
        />
        <div className="chore-details">
          <span className="chore-task">{chore.task}</span>
          <span className="chore-assigned">Assigned to: {chore.assignedTo}</span>
        </div>
      </div>
    </div>
  );
};

export default ChoreItem; 