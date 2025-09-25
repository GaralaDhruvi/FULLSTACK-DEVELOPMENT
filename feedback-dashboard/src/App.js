// App.js
import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  // Name Inputs
  const [firstName, setFirstName] = useState('');
  const [surname, setSurname] = useState('');
  const [greeted, setGreeted] = useState(false);

  // Date & Time
  const [currentTime, setCurrentTime] = useState(new Date());

  // Feedback Counts
  const [feedbackCounts, setFeedbackCounts] = useState({
    Excellent: 0,
    Good: 0,
    Average: 0,
    Poor: 0
  });

  // Participant Feedback Count
  const [participantCount, setParticipantCount] = useState(0);

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Simulate crowd feedback every 2 seconds
  useEffect(() => {
    const crowdInterval = setInterval(() => {
      const categories = ['Excellent', 'Good', 'Average', 'Poor'];
      const randomCategory = categories[Math.floor(Math.random() * categories.length)];
      setFeedbackCounts(prev => ({
        ...prev,
        [randomCategory]: prev[randomCategory] + 1
      }));
    }, 2000);
    return () => clearInterval(crowdInterval);
  }, []);

  // Handle feedback button click
  const handleFeedback = (category) => {
    setFeedbackCounts(prev => ({
      ...prev,
      [category]: prev[category] + 1
    }));
    setParticipantCount(prev => prev + 1);
  };

  return (
    <div className="dashboard">
      <h1>🚀 Product Feedback Dashboard</h1>

      {/* Greeting Section */}
      {!greeted ? (
        <div className="input-section">
          <input type="text" placeholder="First Name" value={firstName}
            onChange={e => setFirstName(e.target.value)} />
          <input type="text" placeholder="Surname" value={surname}
            onChange={e => setSurname(e.target.value)} />
          <button onClick={() => setGreeted(true)}>Enter</button>
        </div>
      ) : (
        <h2>Welcome, {firstName} {surname}!</h2>
      )}

      {/* Live Time */}
      <div className="time-section">
        <p>🕒 {currentTime.toLocaleString()}</p>
      </div>

      {/* Feedback Buttons */}
      <div className="feedback-panel">
        <h3>Submit Your Feedback</h3>
        {['Excellent', 'Good', 'Average', 'Poor'].map(category => (
          <button key={category} onClick={() => handleFeedback(category)}>
            {category} ({feedbackCounts[category]})
          </button>
        ))}
      </div>

      {/* Participant Feedback Counter */}
      <div className="participant-counter">
        <h3>Your Feedback Count: {participantCount}</h3>
        <button onClick={() => setParticipantCount(prev => prev + 1)}>+1</button>
        <button onClick={() => setParticipantCount(prev => prev - 1)} disabled={participantCount === 0}>-1</button>
        <button onClick={() => setParticipantCount(0)}>Reset</button>
        <button onClick={() => setParticipantCount(prev => prev + 5)}>+5</button>
      </div>
    </div>
  );
}

export default App;
