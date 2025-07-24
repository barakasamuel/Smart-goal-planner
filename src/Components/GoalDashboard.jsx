
import React from 'react';

const GoalDashboard = ({ goals, onDelete, getCompletionPercentage }) => {
  const stats = {
    total: goals.length,
    saved: goals.reduce((sum, goal) => sum + goal.savedAmount, 0),
    completed: goals.filter(g => g.savedAmount >= g.targetAmount).length
  };

  return (
    <div className="dashboard">
      <div className="stats">
        <div className="stat-card">
          <h3>{stats.total}</h3>
          <p>Goals</p>
        </div>
        <div className="stat-card">
          <h3>${stats.saved.toFixed(0)}</h3>
          <p>Saved</p>
        </div>
        <div className="stat-card">
          <h3>{stats.completed}</h3>
          <p>Completed</p>
        </div>
      </div>

      <div className="goals-grid">
        {goals.length === 0 ? (
          <p className="no-goals">No goals yet. Create your first goal!</p>
        ) : (
          goals.map(goal => {
            const percentage = getCompletionPercentage(goal);
            const isCompleted = goal.savedAmount >= goal.targetAmount;
            
            return (
              <div key={goal.id} className="goal-card">
                <div className="goal-header">
                  <h3>{goal.name}</h3>
                  <button onClick={() => onDelete(goal.id)}>×</button>
                </div>
                
                <div className="goal-progress">
                  <div className="progress-bar">
                    <div 
                      className="progress-fill" 
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                  <div className="progress-info">
                    <span>${goal.savedAmount} / ${goal.targetAmount}</span>
                    <span>{percentage.toFixed(1)}%</span>
                  </div>
                </div>
                
                <div className="goal-details">
                  <p><strong>Category:</strong> {goal.category || 'General'}</p>
                  {goal.deadline && <p><strong>Deadline:</strong> {goal.deadline}</p>}
                  {isCompleted && <p className="completed">✓ Completed</p>}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default GoalDashboard;