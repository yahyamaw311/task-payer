import React, { useState } from 'react';
import './AddChore.css';

const AddChore = ({ onAdd }) => {
  const [task, setTask] = useState('');
  const [assignedTo, setAssignedTo] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!task.trim() || !assignedTo.trim()) return;
    
    onAdd({
      id: Date.now(),
      task: task.trim(),
      assignedTo: assignedTo.trim(),
      completed: false
    });
    
    setTask('');
    setAssignedTo('');
  };

  return (
    <form className="add-chore-form" onSubmit={handleSubmit}>
      <h3>Add New Chore</h3>
      <div className="form-inputs">
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Enter chore description"
          className="chore-input"
        />
        <input
          type="text"
          value={assignedTo}
          onChange={(e) => setAssignedTo(e.target.value)}
          placeholder="Assign to"
          className="assign-input"
        />
        <button type="submit" className="add-button">Add Chore</button>
      </div>
    </form>
  );
};

export default AddChore; 