import React from 'react';

const Footer = () => {
  return (
    <div style={styles.footerContainer}>
      <div style={styles.footerSection}>
        <h3 style={styles.footerHeading}>About Med-Link Pharmacy</h3>
        <ul style={styles.footerList}>
          {["About Us", "FAQs", "Find a Pharmacy", "Careers", "Contact Us", "Blogs", "Health Queries", "Know Your Health Credits", "About One Apollo Program", "Corporate", "Terms and Conditions", "Privacy Policy"].map((item, index) => (
            <li key={index} style={styles.footerItem}>{item}</li>
          ))}
        </ul>
      </div>

      <div style={styles.footerSection}>
        <h3 style={styles.footerHeading}>Services</h3>
        <ul style={styles.footerList}>
          {["Online Doctor Consultation", "Apollo Pro Health Program", "All Doctors List", "Consult Physicians", "Consult Dermatologists", "Consult Paediatricians", "Consult Gynaecologists", "Consult Gastroenterologists", "Consult Cardiologists", "Consult Dietitians", "Consult ENT Specialists", "Consult Geriatricians"].map((item, index) => (
            <li key={index} style={styles.footerItem}>{item}</li>
          ))}
        </ul>
      </div>

      <div style={styles.footerSection}>
        <h3 style={styles.footerHeading}>Book Lab Tests at Home</h3>
        <ul style={styles.footerList}>
          {["RT PCR Test At Home", "Book Lab Tests at Home", "Renal Profile (KFT, RFT Test)", "Hemogram Test", "Lipid Profile Test", "Thyroid Profile Test (T3 T4 Tsh Test)", "D Dimer Test", "Urine Culture Test", "Complete Blood Count (CBC Test)", "Widal Test", "Liver Function Test (LFT Test)"].map((item, index) => (
            <li key={index} style={styles.footerItem}>{item}</li>
          ))}
        </ul>
      </div>

      <div style={styles.footerSection}>
        <h3 style={styles.footerHeading}>Product Categories</h3>
        <ul style={styles.footerList}>
          {["View All Brands", "View All Salts", "View All Medicine", "View All OTC", "View All Manufacturers", "Health Devices", "Personal Care", "Baby Care", "Nutrition", "Dolo 650", "Beauty Skin Care", "Immunity Boosters"].map((item, index) => (
            <li key={index} style={styles.footerItem}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const styles = {
  footerContainer: {
    display: 'flex',
    justifyContent: 'space-around',
    backgroundColor: '#e6f7f7', // Light background color
    padding: '40px 20px',
    fontFamily: 'Arial, sans-serif',
  },
  footerSection: {
    flex: 1,
    marginRight: '20px',
  },
  footerHeading: {
    fontSize: '18px',
    fontWeight: 'bold',
    marginBottom: '15px',
    color: '#000',
  },
  footerList: {
    listStyleType: 'none',
    padding: 0,
    margin: 0,
    color: '#333',
  },
  footerItem: {
    marginBottom: '10px',
    fontSize: '14px',
    cursor: 'pointer',
    transition: 'color 0.2s',
  },
};

export default Footer;
