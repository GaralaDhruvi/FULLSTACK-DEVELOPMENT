import React, { useState } from "react";
import "./App.css";

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const menuItems = ["Home", "Charusat", "Depstare", "CSE"];

  return (
    <div className="app-container">
      <button className="menu-toggle" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
        ☰
      </button>

      <div className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
        {menuItems.map((item, index) => (
          <button key={index} className="sidebar-button">
            {item}
          </button>
        ))}
      </div>

      <div className="content">
        <h1>Welcome to My Website</h1>
        <p>This is the main content area.</p>
      </div>
    </div>
  );
}

export default App;
