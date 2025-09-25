import React, { useState, useRef } from 'react';
import './App.css';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');
  const recognitionRef = useRef(null);

  const handleAddTask = () => {
    if (input.trim() !== '') {
      setTasks([...tasks, input.trim()]);
      setInput('');
    }
  };

  const handleDeleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  const handleUpdateTask = (index) => {
    const updated = prompt('Update your task:', tasks[index]);
    if (updated !== null && updated.trim() !== '') {
      const updatedTasks = [...tasks];
      updatedTasks[index] = updated.trim();
      setTasks(updatedTasks);
    }
  };

  const handleVoiceSearch = () => {
    if (!('webkitSpeechRecognition' in window)) {
      alert('Your browser does not support Speech Recognition');
      return;
    }

    if (!recognitionRef.current) {
      const recognition = new window.webkitSpeechRecognition();
      recognition.continuous = false;
      recognition.lang = 'en-US';
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;

      recognition.onresult = (event) => {
        const voiceInput = event.results[0][0].transcript;
        setInput(voiceInput);
      };

      recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
      };

      recognitionRef.current = recognition;
    }

    try {
      recognitionRef.current.start();
    } catch (e) {
      console.log('Speech Recognition already started.');
    }
  };

  return (
    <div className="container">
      <h1>To-Do App</h1>
      <div className="input-container">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter a task"
        />
        <button onClick={handleAddTask}>Add</button>
        <button onClick={handleVoiceSearch}>🎤</button>
      </div>
      {tasks.map((task, index) => (
        <div key={index} className="task">
          <span>{task}</span>
          <div>
            <button onClick={() => handleUpdateTask(index)}>✏️</button>
            <button onClick={() => handleDeleteTask(index)}>🗑️</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;
