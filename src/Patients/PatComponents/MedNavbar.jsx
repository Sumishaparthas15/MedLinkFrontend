import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { FaWallet } from 'react-icons/fa';

const MedNavbar = () => {
  const [email, setEmail] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check for stored email in localStorage
    const storedEmail = localStorage.getItem('patientEmail');
    if (storedEmail) {
      setEmail(storedEmail);
    }
  }, []);

  const login = () => {
    navigate('/LOGIN');
  };

  const logout = () => {
    localStorage.removeItem('patientEmail');
    localStorage.removeItem('access');
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh');
    localStorage.removeItem('refresh_token');
    
    setEmail(null);
    navigate('/LOGIN');
  };
  const handleWalletClick = () => {
    navigate('/wallet'); // Navigate to the /wallet route
  };

  return (
    <div style={styles.navbar}>
      {/* Top Section */}
      <div style={styles.navLinks}>
        <div style={styles.logo}>
          Med-Link
        </div>

        {/* Emergency Numbers */}
        <div style={styles.contactSection}>
        <div style={styles.homeIcon} onClick={() => navigate('/')}>
    {/* 🏠 */} Home
  </div>
          <div style={styles.contactItem}>
           
            📞 <span style={styles.contactText}>1066</span>
          </div>
          <div style={styles.contactItem}>
            📞 <span style={styles.contactText}>1860-500-1066</span>
          </div>

          {/* Language Selector */}
          <div>
            <select style={styles.languageSelector}>
              <option>English</option>
              <option>Hindi</option>
            </select>
          </div>

          {/* Conditional Login/Logout */}
          <div>
          {email ? (
        <div style={styles.userSection}>
          <FaWallet
            style={styles.walletIcon}
            onClick={handleWalletClick} // Handle wallet icon click
            title="Go to Wallet"
          />
          <span style={styles.email}>{email}</span>
          <button onClick={logout} style={styles.logoutButton}>
            Logout
          </button>
          
        </div>
      ) : (
        <button onClick={login} style={styles.loginButton}>
          Go to Login
        </button>
      )}
          </div>
        </div>
      </div>

      {/* Navigation Links */}
      <div style={styles.navLinks}>
        <a href="/" style={styles.link}>Patient Care</a>
        <a href="/" style={styles.link}>Centres Of Excellence</a>
        <a href="/" style={styles.link}>Health Information</a>
        <a href="/" style={styles.link}>Corporate</a>
        <a href="/" style={styles.link}>International Patients</a>
        <a href="/" style={styles.link}>Academics & Research</a>
        <a href="/" style={styles.link}>Hospitals</a>
        <a href="/" style={styles.link}>Contact Us</a>
      </div>
    </div>
  );
};

const styles = {
  navbar: {
    display: "flex",
    flexDirection: "column",
    padding: "10px 20px",
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#fff",
  },
  logo: {
    fontSize: "28px",
    fontWeight: "bold",
    color: "#007B8F",
  },
  contactSection: {
    display: "flex",
    alignItems: "center",
    gap: "20px",
  },
  contactItem: {
    display: "flex",
    alignItems: "center",
    gap: "5px",
    fontSize: "14px",
    fontWeight: "bold",
    color: '#007B8F',
  },
  contactText: {
    fontWeight: "bold",
  },
  languageSelector: {
    padding: "5px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    color: '#007B8F',
  },
  navLinks: {
    display: "flex",
    justifyContent: "space-around",
    flexWrap: "wrap",
    borderTop: "1px solid #ddd",
    paddingTop: "10px",
  },
  link: {
    textDecoration: "none",
    color: "black",
    fontSize: "14px",
    margin: "5px 10px",
  },
  userSection: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  email: {
    fontSize: "14px",
    fontWeight: "bold",
    color: "#007B8F",
  },
  loginButton: {
    padding: "6px 12px",
    backgroundColor: "#007B8F",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  logoutButton: {
    padding: "6px 12px",
    backgroundColor: "#007B8F",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  walletIcon: {
    fontSize: '20px',
    color: '#007B8F',
    cursor: 'pointer',
  },
  homeIcon: {
    fontSize: "14px",
    fontWeight: "bold",
    cursor: 'pointer',
    color: '#007B8F',
    padding: '5px',
  },
};

export default MedNavbar;
