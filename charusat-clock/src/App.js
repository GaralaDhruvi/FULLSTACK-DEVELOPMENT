import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="App">
      <h1>Welcome to CHARUSAT!!!!</h1>
      <h2>It is {currentTime.toLocaleDateString()}</h2>
      <h2>It is {currentTime.toLocaleTimeString()}</h2>
    </div>
  );
}

export default App;
