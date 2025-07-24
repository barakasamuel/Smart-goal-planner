
import React, { useState, useEffect } from 'react';
import GoalDashboard from './components/GoalDashboard/';
import GoalCreator from './components/GoalCreator/';
import DepositManager from './components/DepositManager/';
import './styles.css';

const API_URL = 'http://localhost:3001/goals';

function App() {
  const [goals, setGoals] = useState([]);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchGoals();
  }, []);

  const fetchGoals = async () => {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error('Failed to fetch goals');
      const data = await response.json();
      setGoals(data);
      setError('');
    } catch (err) {
      console.error('Error fetching goals:', err);
      setError('Could not load goals. Make sure json-server is running on port 3001.');
    } finally {
      setLoading(false);
    }
  };

  const addGoal = async (newGoal) => {
    try {
      const goalToAdd = {
        ...newGoal,
        savedAmount: 0,
        createdAt: new Date().toISOString().split('T')[0]
      };
      
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(goalToAdd)
      });
      
      if (!response.ok) throw new Error('Failed to add goal');
      
      const addedGoal = await response.json();
      setGoals([...goals, addedGoal]);
      setError('');
    } catch (err) {
      console.error('Error adding goal:', err);
      setError('Failed to add goal. Please try again.');
    }
  };

  const updateGoal = async (id, updatedFields) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'PATCH',
        headers: { 
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedFields)
      });
      
      if (!response.ok) throw new Error('Failed to update goal');
      
      const updatedGoal = await response.json();
      setGoals(goals.map(goal => goal.id === id ? {...goal, ...updatedGoal} : goal));
      setError('');
    } catch (err) {
      console.error('Error updating goal:', err);
      setError('Failed to update goal. Please try again.');
    }
  };

  const deleteGoal = async (id) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE'
      });
      
      if (!response.ok) throw new Error('Failed to delete goal');
      
      setGoals(goals.filter(goal => goal.id !== id));
      setError('');
    } catch (err) {
      console.error('Error deleting goal:', err);
      setError('Failed to delete goal. Please try again.');
    }
  };

  const makeDeposit = async (id, amount) => {
    const goal = goals.find(g => g.id === id);
    if (!goal) return;
    
    const newAmount = goal.savedAmount + parseFloat(amount);
    await updateGoal(id, { savedAmount: newAmount });
  };

  const getCompletionPercentage = (goal) => {
    return Math.min(100, (goal.savedAmount / goal.targetAmount) * 100);
  };

  if (loading) return <div className="app">Loading goals...</div>;

  return (
    <div className="app">
      <header>
        <h1>Smart Goal Planner</h1>
      </header>

      {error && <div className="error-message">{error}</div>}

      <nav>
        <button className={activeTab === 'dashboard' ? 'active' : ''} onClick={() => setActiveTab('dashboard')}>
          Dashboard
        </button>
        <button className={activeTab === 'create' ? 'active' : ''} onClick={() => setActiveTab('create')}>
          Create Goal
        </button>
        <button className={activeTab === 'deposit' ? 'active' : ''} onClick={() => setActiveTab('deposit')}>
          Make Deposit
        </button>
      </nav>

      <main>
        {activeTab === 'dashboard' && (
          <GoalDashboard 
            goals={goals} 
            onDelete={deleteGoal}
            getCompletionPercentage={getCompletionPercentage}
          />
        )}
        {activeTab === 'create' && <GoalCreator onAddGoal={addGoal} />}
        {activeTab === 'deposit' && (
          <DepositManager 
            goals={goals} 
            onDeposit={makeDeposit}
            getCompletionPercentage={getCompletionPercentage}
          />
        )}
      </main>
    </div>
  );
}

export default App;