
import React, { useState } from 'react';

const GoalCreator = ({ onAddGoal }) => {
  const [formData, setFormData] = useState({
    name: '',
    targetAmount: '',
    category: 'General',
    deadline: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddGoal({
      ...formData,
      targetAmount: parseFloat(formData.targetAmount),
      id: Date.now().toString() 
    });
    setFormData({ name: '', targetAmount: '', category: 'General', deadline: '' });
  };

  return (
    <div className="goal-creator">
      <h2>Create New Goal</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Goal Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label>Target Amount ($)</label>
          <input
            type="number"
            name="targetAmount"
            value={formData.targetAmount}
            onChange={handleChange}
            min="0.01"
            step="0.01"
            required
          />
        </div>
        
        <div className="form-group">
          <label>Category</label>
          <select name="category" value={formData.category} onChange={handleChange}>
            <option value="General">General</option>
            <option value="Travel">Travel</option>
            <option value="Emergency">Emergency</option>
            <option value="Electronics">Electronics</option>
            <option value="Home">Home</option>
            <option value="Education">Education</option>
            <option value="Health">Health</option>
          </select>
        </div>
        
        <div className="form-group">
          <label>Deadline (optional)</label>
          <input
            type="date"
            name="deadline"
            value={formData.deadline}
            onChange={handleChange}
          />
        </div>
        
        <button type="submit">Create Goal</button>
      </form>
    </div>
  );
};

export default GoalCreator;