
import React, { useState } from 'react';

const DepositManager = ({ goals, onDeposit, getCompletionPercentage }) => {
  const [selectedGoalId, setSelectedGoalId] = useState('');
  const [amount, setAmount] = useState('');

  const selectedGoal = goals.find(goal => goal.id === selectedGoalId);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedGoalId && amount) {
      onDeposit(selectedGoalId, amount);
      setSelectedGoalId('');
      setAmount('');
    }
  };

  return (
    <div className="deposit-manager">
      <h2>Make a Deposit</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Select Goal</label>
          <select value={selectedGoalId} onChange={(e) => setSelectedGoalId(e.target.value)} required>
            <option value="">Choose a goal</option>
            {goals.map(goal => (
              <option key={goal.id} value={goal.id}>
                {goal.name} (${goal.savedAmount} / ${goal.targetAmount})
              </option>
            ))}
          </select>
        </div>
        
        <div className="form-group">
          <label>Deposit Amount ($)</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            min="0.01"
            step="0.01"
            required
          />
        </div>
        
        <button type="submit">Deposit</button>
      </form>
      
      {selectedGoal && (
        <div className="deposit-preview">
          <h3>Preview</h3>
          <p><strong>Goal:</strong> {selectedGoal.name}</p>
          <p><strong>Current:</strong> ${selectedGoal.savedAmount}</p>
          <p><strong>After Deposit:</strong> ${(selectedGoal.savedAmount + parseFloat(amount)).toFixed(2)}</p>
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${getCompletionPercentage(selectedGoal)}%` }}
            ></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DepositManager;