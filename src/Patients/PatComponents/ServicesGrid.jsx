import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ServicesGrid = () => {
  const navigate = useNavigate();

  // Services Data
  const services = [
    { icon: "📅", title: "Book Appointment", route: "/bookop" },
    { icon: "👩🏻‍⚕️", title: "Doctors", route: "/find-doctor" },
    { icon: "🏥", title: "Hospitals", route: "/find-hospital" },
    { icon: "📝", title: "Book Health Check-Up", route: "/op_history" },
    // { icon: "🔍", title: "Symption Checker", route: "/chatbot" },
    { icon: "💻", title: "Hospital", route: "/security" },
    { icon: "🙍🏻", title: "Profile", route: "/changeprofile" },
  ];

  const [hoveredIndex, setHoveredIndex] = useState(null);

  const handleClick = (route) => {
    navigate(route);
  };

  return (
    <div>
     
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        gap: "20px",
        marginTop: "-220px",
      }}
    >
      {services.map((service, index) => (
        <div
          key={index}
          onMouseEnter={() => setHoveredIndex(index)}
          onMouseLeave={() => setHoveredIndex(null)}
          onClick={() => handleClick(service.route)} // Navigate on click
          style={{
            width: "150px",
            height: "150px",
            background: hoveredIndex === index ? "#f0f8ff" : "white",
            borderRadius: "10px",
            boxShadow: hoveredIndex === index
              ? "0 8px 12px rgba(0, 0, 0, 0.2)"
              : "0 4px 6px rgba(0, 0, 0, 0.1)",
            transform: hoveredIndex === index ? "scale(1.05)" : "scale(1)",
            transition: "all 0.3s ease",
            textAlign: "center",
            padding: "20px",
            fontFamily: "Arial, sans-serif",
            cursor: "pointer",
          }}
        >
          <div
            style={{
              fontSize: "40px",
              marginBottom: "10px",
            }}
          >
            {service.icon}
          </div>
          <div
            style={{
              fontSize: "14px",
              fontWeight: "bold",
              color: "#333",
            }}
          >
            {service.title}
          </div>
        </div>
      ))}
    </div>
    </div>
  );
};

export default ServicesGrid;
