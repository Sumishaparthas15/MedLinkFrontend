import React from 'react';
import { 
  FaHeartbeat, FaBrain, FaUtensils, FaBone, FaRibbon, 
  FaFemale, FaPaintBrush, FaEye, FaChild, FaMicroscope, 
  FaToilet, FaLungs, FaNotesMedical, FaRadiation, FaUserNurse, 
  FaBaby, FaProcedures, FaStethoscope 
} from 'react-icons/fa';
import doctorImage from "../../images/explore.jpg"; 
import { Height } from '@mui/icons-material';

const UIDepartments = () => {
  const departments = [
    { name: "Cardiology", icon: <FaHeartbeat /> },
    { name: "Neurology", icon: <FaBrain /> },
    { name: "Gastroenterology", icon: <FaUtensils /> },
    { name: "Orthopedic", icon: <FaBone /> },
    { name: "Oncology", icon: <FaRibbon /> },
    { name: "Gynecology", icon: <FaFemale /> },
    { name: "Dermatology", icon: <FaPaintBrush /> },
    { name: "Ophthalmology", icon: <FaEye /> },
    { name: "Pediatrics", icon: <FaChild /> },
    { name: "Endocrinology", icon: <FaMicroscope /> },
    { name: "Urology", icon: <FaToilet /> },
    { name: "Nephrology", icon: <FaNotesMedical /> },
    { name: "Pulmonology", icon: <FaLungs /> },
    { name: "Rheumatology", icon: <FaUserNurse /> },
    { name: "Radiology", icon: <FaRadiation /> },
    { name: "Plastic Surgery", icon: <FaProcedures /> },
    { name: "Neonatology", icon: <FaBaby /> },
    { name: "Vascular Surgery", icon: <FaStethoscope /> },
  ];

  return (
    <div style={styles.container}>
      {/* Left Section */}
      <div style={styles.leftSection}>
        <img src={doctorImage} alt="Doctor Consultation" style={styles.image} />
      </div>

      {/* Right Section */}
      <div style={styles.rightSection}>
        <div style={styles.grid}>
          {departments.map((dept, index) => (
            <div key={index} style={styles.card}>
              <span style={styles.icon}>{dept.icon}</span>
              <p style={styles.cardText}>{dept.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Inline Styles
const styles = {
  container: {
    display: "flex",
    justifyContent: "space-between",
    padding: "20px",
    fontFamily: "Arial, sans-serif",
  },
  leftSection: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    maxWidth: "450px",
    height: "500px", // Adjust the height value as needed
    objectFit: "cover", // Ensures the image maintains a nice aspect ratio without stretching
    borderRadius: "8px",
  },

  rightSection: {
    flex: 1.5,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "20px",
    marginBottom: "20px",
  },
  card: {
    backgroundColor: "#f9f9f9",
    border: "1px solid #ddd",
    borderRadius: "8px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "15px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    cursor: "pointer",
    transition: "transform 0.2s",
  },
  icon: {
    fontSize: "30px",
    color: "#0db6e3",
    marginBottom: "10px",
  },
  cardText: {
    fontSize: "14px",
    textAlign: "center",
    color: "#333",
    fontWeight: "bold",
  },
};

export default UIDepartments;
