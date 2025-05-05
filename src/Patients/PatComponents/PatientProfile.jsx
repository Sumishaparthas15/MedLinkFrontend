
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaEdit, FaSave, FaTimes } from 'react-icons/fa';
import PatPanel from './PatPanel';
import MedNavbar from './MedNavbar';
import { useNavigate } from 'react-router-dom';
import Footer from './Footer';
import config from '../../config';

const PatientProfile = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingField, setEditingField] = useState(null);
  const [editValue, setEditValue] = useState('');
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  const getAccessToken = () => JSON.parse(localStorage.getItem('access'));

  useEffect(() => {
    const fetchUserProfile = async () => {
      const accessToken = getAccessToken();

      if (!accessToken) {
        navigate('/LOGIN',)
        setError('Access token not found.');
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`${config.API_BASE_URL}/api/Patientsprofile/`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setUserData(response.data);
      } catch (err) {
        setError('Failed to load user data.');
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  const handleEdit = (field) => {
    setEditingField(field);
    setEditValue(userData[field]);
  };

  const handleChange = (e) => {
    setEditValue(e.target.value);
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSave = async () => {
    const formData = new FormData();
    if (editingField === 'profile_img' && image) {
      formData.append('profile_img', image);
    } else {
      formData.append(editingField, editValue);
    }

    const accessToken = getAccessToken();

    try {
      const response = await axios.patch(
        `${config.API_BASE_URL}/api/Patientsprofile/`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      setUserData({ ...userData, [editingField]: response.data[editingField] });

      if (editingField === 'email') {
        localStorage.setItem('patientEmail', response.data.email);
      }

      setEditingField(null);
      setEditValue('');
      setImage(null);
    } catch (err) {
      setError('Failed to save data.');
    }
  };

  const styles = {
    container: {
      display: 'flex',
      width: '80%',
      margin: '0 auto',
      padding: '20px',
      boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
      borderRadius: '10px',
      backgroundColor: '#fff',
      gap: '0px',
      marginTop:'30px'
    },
    leftSide: {
      width: '50%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
    },
    rightSide: {
      width: '50%',
      display: 'block',
      padding: '20px',
      boxSizing: 'border-box',
    },
    profileImage: {
      width: '300px',        // Adjust width for rectangle
      height: '350px',       // Adjust height for rectangle
      objectFit: 'cover',    // Ensures the image scales correctly
      borderRadius: '8px',   // Optional: Slightly rounded corners (remove if not needed)
      border: '1px solid #ccc', // Optional: Adds a subtle border
    },
    
    header: {
      textAlign: 'center',
      fontSize: '24px',
      fontWeight: 'bold',
      marginBottom: '20px',
    },
    tableRow: {
      marginBottom: '20px',
    },
    input: {
      width: '100%',
      padding: '8px',
      marginTop: '5px',
      borderRadius: '4px',
      border: '1px solid #ccc',
    },
    fileInput: {
      marginTop: '10px',
    },
    button: {
      backgroundColor: '#007bff',
      color: '#fff',
      border: 'none',
      borderRadius: '4px',
      padding: '10px 15px',
      cursor: 'pointer',
      fontWeight: 'bold',
      marginTop: '10px',
      display: 'inline-flex',
      alignItems: 'center',
      gap: '5px',
    },
    buttonDisabled: {
      backgroundColor: '#6c757d',
      cursor: 'not-allowed',
    },
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <MedNavbar />
      <div style={styles.container}>
        {/* Left Side - Profile Image */}
        <div style={styles.leftSide}>
          <img
            src={userData.profile_img ? `${config.API_BASE_URL}${userData.profile_img}` : 'default_profile.png'}
            alt="Profile"
            style={styles.profileImage}
          />
          {editingField === 'profile_img' && (
            <input type="file" onChange={handleImageChange} style={styles.fileInput} />
          )}
        </div>

        {/* Right Side - User Details */}
        <div style={styles.rightSide}>
          <h2 style={styles.header}>User Profile</h2>
          <div style={styles.tableRow}>
            <strong>Username:</strong>
            {editingField === 'username' ? (
              <input
                type="text"
                value={editValue}
                onChange={handleChange}
                style={styles.input}
              />
            ) : (
              <div>{userData.username}</div>
            )}
            <button style={styles.button} onClick={() => handleEdit('username')}>
              <FaEdit /> Edit Username
            </button>
          </div>
          <div style={styles.tableRow}>
            <strong>Email:</strong>
            {editingField === 'email' ? (
              <input
                type="text"
                value={editValue}
                onChange={handleChange}
                style={styles.input}
              />
            ) : (
              <div>{userData.email}</div>
            )}
            <button style={styles.button} onClick={() => handleEdit('email')}>
              <FaEdit /> Edit Email
            </button>
          </div>
          
          <div style={styles.tableRow}>
            <button style={styles.button} onClick={() => handleEdit('profile_img')}>
              <FaEdit /> Change Profile Image
            </button>
          </div>
          {editingField && (
            <div>
              <button style={styles.button} onClick={handleSave}>
                <FaSave /> Save
              </button>
              <button
                style={{ ...styles.button, ...styles.buttonDisabled }}
                onClick={() => setEditingField(null)}
              >
                <FaTimes /> Cancel
              </button>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PatientProfile;
