import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate
import MedNavbar from './MedNavbar';
import Footer from './Footer';
import config from '../../config';


function FindHospitals() {
  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '20px',
    },
    hospitalContainer: {
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: '20px',
      width: '100%',
      padding: '20px',
    },
    hospitalCard: {
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
    hospitalImage: {
      width: '100px',
      height: '100px',
      borderRadius: '50%',
      objectFit: 'cover',
      margin: '0 auto 10px',
    },
    hospitalInfo: {
      textAlign: 'left',
      marginTop: '10px',
      flexGrow: 1,
    },
    bookButton: {
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

  const [hospitals, setHospitals] = useState([]);
  const [email, setEmail] = useState(null); // Track logged-in user's email
  const navigate = useNavigate();  // Hook for navigation

  // Fetch hospitals when the component mounts
  useEffect(() => {
    fetch(`${config.API_BASE_URL}/api/UIHospitalListView/`)  // Adjust URL for your API
      .then((response) => response.json())
      .then((data) => setHospitals(data.hospitals || []))
      .catch((error) => console.error('Error fetching hospitals:', error));

    // Check for stored email in localStorage to determine login status
    const storedEmail = localStorage.getItem('patientEmail');
    if (storedEmail) {
      setEmail(storedEmail); // Set the email if logged in
    }
  }, []);

  const handleBookClick = (hospital) => {
    // Implement booking logic if required
    console.log('Hospital selected for booking:', hospital);
  };

  return (
    <div>
      <MedNavbar />
      <div style={{ display: 'flex', justifyContent: 'center' }}>
    <h4 style={{ color: 'rgb(40, 155, 145)' }}>REGISTERED HOSPITALS</h4>
</div>


      <div style={styles.hospitalContainer}>
       
        {hospitals.length > 0 ? (
          hospitals.map((hospital, index) => (
            <div key={index} style={styles.hospitalCard}>
              {/* Use hospital photo if required */}
              {/* <div
                style={{
                  ...styles.hospitalImage,
                  backgroundImage: `url(${hospital.photo})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                }}
              ></div> */}
              <h4>🏥  {hospital.hospital_name}</h4>
              <div style={styles.hospitalInfo}>
                <p><strong>Email:</strong> {hospital.email}</p>
                <p><strong>Phone:</strong> {hospital.phone_number}</p>
                <p><strong>Address:</strong> {hospital.address}</p>
                {/* <p><strong>City:</strong> {hospital.city}</p> */}
                <p><strong>District:</strong> {hospital.district}</p>
                <p><strong>Appointment Fee:</strong> {hospital.appointment_limit}</p>
                <p><strong>Accreditations:</strong> {hospital.accreditations}</p>
                
                
              </div>
              
            </div>
          ))
        ) : (
          <p>Loading hospitals...</p>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default FindHospitals;
