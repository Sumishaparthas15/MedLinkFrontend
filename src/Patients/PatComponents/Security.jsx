import React from 'react'
import MedNavbar from './MedNavbar'
import Footer from './Footer'


const Security = () => {
  return (
    <div>
        <MedNavbar/>
        <div style={styles.container}>
      {/* Left Section - Illustration */}
      <div style={styles.illustrationContainer}>
        <div style={styles.buildingWrapper}>
          <div style={styles.buildingMain}></div>
          <div style={styles.buildingSide}></div>
          <div style={styles.buildingTop}>
            <div style={styles.padlock}></div>
          </div>
        </div>
      </div>

      {/* Right Section - Content */}
      <div style={styles.contentContainer}>
        <h1 style={styles.heading}>
          <span style={styles.blueText}>Data Security</span> is our top priority.
        </h1>
        <p style={styles.paragraph}>
          Data breaches incidents are at its historical highs given the
          integrated nature of the world. Naturally, data security and privacy
          concerns are the foremost thoughts on everybody's mind, may that be
          individuals wanting to protect them and their family, organizations
          wanting to protect their brand and their customers or healthcare
          professionals wanting to protect their patients. Focusing on these
          priorities and concern we have implemented durable security measures
          throughout our platform through a collection of encryption, least
          privileges, and state of the art firewall technologies.
        </p>
        <div style={styles.securityContainer}>
          <div style={styles.securityItem}>
            <div style={styles.icon}>🔒</div>
            <p style={styles.securityText}>
              <strong>256-bit</strong> <br /> encryption
            </p>
          </div>
          <div style={styles.securityItem}>
            <div style={styles.icon}>ISO</div>
            <p style={styles.securityText}>
              <strong>ISO 27001</strong> <br /> certified
            </p>
          </div>
          <div style={styles.securityItem}>
            <div style={styles.icon}>🏥</div>
            <p style={styles.securityText}>
              <strong>HIPAA</strong> <br /> compliant data centres
            </p>
          </div>
          <div style={styles.securityItem}>
            <div style={styles.icon}>🔑</div>
            <p style={styles.securityText}>
              <strong>DSCI</strong> <br /> member
            </p>
          </div>
        </div>
      </div>
    </div>
        <Footer/>
    </div>
  )
}
const styles = {
    container: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "Arial, sans-serif",
      padding: "20px",
      backgroundColor: "#F9FAFB",
    },
    illustrationContainer: {
      width: "40%",
      display: "flex",
      justifyContent: "center",
    },
    buildingWrapper: {
      position: "relative",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    buildingMain: {
      width: "120px",
      height: "200px",
      backgroundColor: "#5B9DFE",
      margin: "10px",
      borderRadius: "5px",
    },
    buildingSide: {
      width: "80px",
      height: "180px",
      backgroundColor: "#C0D9FB",
      position: "absolute",
      right: "-60px",
      borderRadius: "5px",
    },
    buildingTop: {
      position: "absolute",
      top: "-40px",
      width: "120px",
      height: "40px",
      backgroundColor: "#5B9DFE",
      borderRadius: "5px",
      display: "flex",
      justifyContent: "center",
    },
    padlock: {
      width: "30px",
      height: "30px",
      backgroundColor: "#0D47A1",
      borderRadius: "50%",
    },
    contentContainer: {
      width: "50%",
      paddingLeft: "40px",
    },
    heading: {
      fontSize: "28px",
      fontWeight: "bold",
      marginBottom: "20px",
    },
    blueText: {
      color: "#007BFF",
    },
    paragraph: {
      fontSize: "16px",
      lineHeight: "1.6",
      color: "#555",
      marginBottom: "30px",
    },
    securityContainer: {
      display: "flex",
      justifyContent: "space-between",
      marginTop: "20px",
    },
    securityItem: {
      textAlign: "center",
      width: "80px",
    },
    icon: {
      fontSize: "28px",
      marginBottom: "10px",
      color: "#007BFF",
    },
    securityText: {
      fontSize: "14px",
      color: "#333",
    },
  };
export default Security