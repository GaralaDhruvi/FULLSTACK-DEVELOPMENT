// App.js
import React, { useState } from "react";
import "./App.css";

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activePage, setActivePage] = useState("home");

  const menuItems = [
    { name: "Home", action: () => setActivePage("home") },
    { name: "Charusat", action: () => setActivePage("charusat") },
    { name: "Depstare", action: () => setActivePage("depstare") },
    { name: "CSE", action: () => setActivePage("cse") },
  ];

  const renderContent = () => {
    switch (activePage) {
      case "home":
        return (
          <div className="home-image-wrapper">
            <img
              className="home-banner"
              src="https://pbs.twimg.com/media/GHE3ml6XcAACD5_.jpg:large"
              alt="Charotar University of Science and Technology Banner"
            />
          </div>
        );

      case "charusat":
        const charusatImages = [
          {
            src: "https://www.charusat.ac.in/_next/static/media/CSPIT.1d26e07c.jpg",
            alt: "CSPIT"
          },
          {
            src: "https://www.charusat.ac.in/_next/static/media/DEPSTAR.f30f65ac.jpg",
            alt: "DEPSTAR"
          },
          {
            src: "https://www.charusat.ac.in/_next/static/media/RPCP.5f013e73.jpg",
            alt: "RPCP"
          },
          {
            src: "https://www.charusat.ac.in/_next/static/media/CMPICA.c4609280.jpg",
            alt: "CMPICA"
          },
          {
            src: "https://www.charusat.ac.in/_next/static/media/I2IM.843d0217.jpg",
            alt: "I2IM"
          },
          {
            src: "https://www.charusat.ac.in/_next/static/media/PDPIAS.f534b286.jpg",
            alt: "PDPIAS"
          },
          {
            src: "https://www.charusat.ac.in/_next/static/media/MTIN.9b0cee99.jpg",
            alt: "MTIN"
          },
          {
            src: "https://www.charusat.ac.in/_next/static/media/ARIP.67a16806.jpg",
            alt: "ARIP"
          }
        ];

        return (
          <div className="charusat-gallery">
            {charusatImages.map((img, index) => (
              <div key={index} className="image-card">
                <img src={img.src} alt={img.alt} />
                <p>{img.alt}</p>
              </div>
            ))}
          </div>
        );

      case "depstare":
        const courses = [
          {
            title: "Bachelor of Technology (Computer Engineering)",
            duration: "04 Years",
            intake: "120 Seats",
            fees: "₹ 1,48,000",
          },
          {
            title: "Bachelor of Technology (Computer Science & Engineering)",
            duration: "04 Years",
            intake: "120 Seats",
            fees: "₹ 1,48,000",
          },
          {
            title: "Bachelor of Technology (Information Technology)",
            duration: "04 Years",
            intake: "60 Seats",
            fees: "₹ 1,48,000",
          },
        ];

        return (
          <div className="course-grid-wrapper">
            <div className="course-grid">
              {courses.map((course, idx) => (
                <div key={idx} className="course-card">
                  <h3>{course.title}</h3>
                  <p><span className="label">Course Duration:</span> {course.duration}</p>
                  <p><span className="label">Intake:</span> {course.intake}</p>
                  <p><span className="label">Fees:</span> {course.fees}</p>
                </div>
              ))}
            </div>
          </div>
        );

      case "cse":
        return (
          <div className="course-section">
            <div className="course-card">
              <h3>Bachelor of Technology (Computer Science & Engineering)</h3>
              <p><span className="label">Course Duration:</span> 04 Years</p>
              <p><span className="label">Intake:</span> 120 Seats</p>
              <p><span className="label">Fees:</span> ₹ 1,48,000</p>
            </div>
          </div>
        );

      default:
        return <h2>Welcome to My Website</h2>;
    }
  };

  return (
    <div className="app-container">
      <button
        className="menu-toggle"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        ☰
      </button>

      <div className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
        {menuItems.map((item, index) => (
          <button
            key={index}
            className="sidebar-button"
            onClick={() => {
              item.action();
              setIsSidebarOpen(false);
            }}
          >
            {item.name}
          </button>
        ))}
      </div>

      <div className="content">{renderContent()}</div>
    </div>
  );
}

export default App;
