import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate
import MedNavbar from './MedNavbar';
import Footer from './Footer';

function FindDoctor() {
  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '20px',
    },
    formContainer: {
      marginBottom: '20px',
      display: 'flex',
      gap: '10px',
      justifyContent: 'center',
    },
    select: {
      padding: '10px',
      borderRadius: '5px',
      border: '1px solid #ccc',
      minWidth: '200px',
    },
    doctorContainer: {
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: '20px',
      width: '100%',
      padding: '20px',
    },
    doctorCard: {
      border: '1px solid #ccc',
      borderRadius: '10px',
      padding: '15px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      textAlign: 'center',
      width: '100%',
      minHeight: '200px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
    },
    doctorImage: {
      width: '100px',
      height: '100px',
      borderRadius: '50%',
      objectFit: 'cover',
      margin: '0 auto 10px',
    },
    doctorInfo: {
      textAlign: 'left',
      marginTop: '10px',
      flexGrow: 1,
    },
    doctorButton: {
      marginTop: '10px',
      padding: '10px 20px',
      backgroundColor: 'rgb(40, 155, 145)',
      color: 'white',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      alignSelf: 'center',
    },
    loginButton: {
      marginTop: '10px',
      padding: '10px 20px',
      backgroundColor: 'rgb(40, 155, 145)',
      color: 'white',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      alignSelf: 'center',
    },
  };

  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [email, setEmail] = useState(null); // Track logged-in user's email
  const navigate = useNavigate();  // Hook for navigation

  // Fetch doctors when the component mounts
  useEffect(() => {
    fetch('http://localhost:8080/api/doctors/')
      .then((response) => response.json())
      .then((data) => setDoctors(data.doctors || []))
      .catch((error) => console.error('Error fetching doctors:', error));

    // Check for stored email in localStorage to determine login status
    const storedEmail = localStorage.getItem('patientEmail');
    if (storedEmail) {
      setEmail(storedEmail); // Set the email if logged in
    }
  }, []);

  const handleBookClick = (doctor) => {
    setSelectedDoctor(doctor);
  };

  const closeModal = () => {
    setSelectedDoctor(null);
  };

  const handleButtonClick = () => {
    if (email) {
      // If user is logged in, navigate to the /bookup page
      navigate('/bookop');
    } else {
      // If user is not logged in, navigate to the login page
      navigate('/LOGIN');
    }
  };

  return (
    <div>
      <MedNavbar />
      <div style={styles.doctorContainer}>
        {doctors.length > 0 ? (
          doctors.map((doctor, index) => (
            <div key={index} style={styles.doctorCard}>
              <div
                style={{
                  ...styles.doctorImage,
                  backgroundImage: `url(${doctor.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                }}
              ></div>
              <h4>{doctor.name}</h4>
              <div style={styles.doctorInfo}>
                <p>
                  <strong>Specialty:</strong> {doctor.department}
                </p>
                <p>
                  <strong>Hospital:</strong> {doctor.hospital}
                </p>
                <p>
                  <strong>District:</strong> {doctor.district}
                </p>
                <p>
                  <strong>Experience:</strong> {doctor.experience || 'N/A'} years
                </p>
                <p>
                    <strong>Available Days:</strong>{" "}
                    {Object.keys(doctor.available_days)
                      .filter((day) => doctor.available_days[day])
                      .map((day) => day.charAt(0).toUpperCase() + day.slice(1))
                      .join(", ")}
                  </p>

              </div>
              <button onClick={() => handleBookClick(doctor)} style={styles.doctorButton}>
                Book Appointment
              </button>
            </div>
          ))
        ) : (
          <p>Loading doctors...</p>
        )}
      </div>

      {selectedDoctor && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000,
          }}
        >
          <div
            style={{
              backgroundColor: 'white',
              padding: '20px',
              borderRadius: '10px',
              width: '80%',
              maxWidth: '500px',
              textAlign: 'center',
            }}
          >
            <button
              onClick={closeModal}
              style={{
                backgroundColor: 'red',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                padding: '5px 10px',
                cursor: 'pointer',
                float: 'right',
              }}
            >
              X
            </button>
            <h2>Book Appointment</h2>
            <p>
              <strong>Name:</strong> {selectedDoctor.name}
            </p>
            <p>
              <strong>Department:</strong> {selectedDoctor.department}
            </p>
            <p>
              <strong>Hospital:</strong> {selectedDoctor.hospital}
            </p>
            <p>
              <strong>District:</strong> {selectedDoctor.district}
            </p>
            
            <button onClick={handleButtonClick} style={email ? styles.doctorButton : styles.loginButton}>
              {email ? 'Book Appointment' : 'Login to Book'}
            </button>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
}

export default FindDoctor;
