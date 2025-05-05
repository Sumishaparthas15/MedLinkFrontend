import React, { useState, useEffect } from 'react';
import PatPanel from './PatPanel';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ReactDatePicker from 'react-datepicker';
import './react-datepicker.css'
import MedNavbar from './MedNavbar';
import Footer from './Footer';
import palakkadImage from '../../images/PALAKKAD-FEATURE-compressed.jpg';
import ThrissurImage from '../../images/thrissure-trekking.avif';
import ekmImage from '../../images/Ernakulam-Discover-The-Urbane-Face-Of-Kochi-Kerala.jpg';
import KoziImage from '../../images/kozhikode-beach-2-20230509170339267388.webp';
import Hospiatl from '../../images/hospital-icon-your-website-design-260nw-2284645525.webp';
import config from '../../config'


function Bookup() {
  const [form, setForm] = useState({
    district: '',
    hospital: '',
    department: '',
    doctor: '',
    date: '',
  });
  const [districts, setDistricts] = useState([]);
  const [hospitals, setHospitals] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [availableDays, setAvailableDays] = useState([]);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('razorpay');
  const navigate = useNavigate();
  const [currentMonth, setCurrentMonth] = useState(new Date()); // Current month
  const [selectedDate, setSelectedDate] = useState(null);
  const districtsk = ['Palakkad', 'Thrissur', 'Ernamkulam', 'Kozhikode'];

  const getDistrictImage = (district) => {
    switch (district) {
      case 'Palakkad':
        return palakkadImage;
      case 'Thrissur':
        return ThrissurImage;
      case 'Ernamkulam':
        return ekmImage;
      case 'Kozhikode':
        return KoziImage;
      default:
        return null;
    }
  };
  const getHospitalImage = (hospital) => Hospiatl; 
  // Utility function to retrieve access token from localStorage
  const getAccessToken = () => JSON.parse(localStorage.getItem('access'));
  const getRefreshToken = () => JSON.parse(localStorage.getItem('refresh'));

  // Utility to refresh token
  const refreshAccessToken = async () => {
    const refreshToken = getRefreshToken();
    if (!refreshToken) {
      console.error('No refresh token found');
      return null;
    }

    try {
      const response = await fetch(`${config.API_BASE_URL}/api/token/refresh/`,{
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refresh: refreshToken }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('access', JSON.stringify(data.access));
        return data.access;
      } else {
        throw new Error('Failed to refresh token');
      }
    } catch (error) {
      console.error('Error refreshing token:', error);
      return null;
    }
  };

  // Fetch helper that automatically handles token expiration
  const fetchWithToken = async (url, options = {}) => {
    let accessToken = getAccessToken();
    if (!accessToken) {
      navigate('/LOGIN',)
      accessToken = await refreshAccessToken();
      if (!accessToken) {
        return null;
      }
    }

    const headers = {
      'Authorization': `Bearer ${accessToken}`,
      ...options.headers,
    };

    const response = await fetch(url, { ...options, headers });
    if (response.status === 401) {
      const newAccessToken = await refreshAccessToken();
      if (newAccessToken) {
        return fetch(url, { ...options, headers: { 'Authorization': `Bearer ${newAccessToken}`, ...options.headers } });
      }
    }
    return response;
  };

  // Fetch districts on mount
  useEffect(() => {
    fetchWithToken(`${config.API_BASE_URL}/api/districts/`)
      .then(response => response.json())
      .then(data => setDistricts(data.districts || []))
      .catch(error => console.error('Error fetching districts:', error));
  }, []);

  // Fetch hospitals when district changes
  useEffect(() => {
    if (form.district) {
      fetchWithToken(`${config.API_BASE_URL}/api/hospitals/${form.district}/`)
        .then(response => response.json())
        .then(data => setHospitals(data.hospitals || []))
        .catch(error => console.error('Error fetching hospitals:', error));
    } else {
      setHospitals([]);
    }
  }, [form.district]);

  // Fetch departments when hospital changes
  useEffect(() => {
    if (form.hospital) {
      fetchWithToken(`${config.API_BASE_URL}/api/hospitaldepartmentspatient/${form.hospital}/`)
        .then(response => response.json())
        .then(data => setDepartments(data || []))
        .catch(error => console.error('Error fetching departments:', error));
    } else {
      setDepartments([]);
    }
  }, [form.hospital]);

  // Fetch doctors when department changes
  useEffect(() => {
    if (form.department) {
      fetchWithToken(`${config.API_BASE_URL}/api/hospitaldoctors/${form.department}/`)
        .then(response => response.json())
        .then(data => setDoctors(data || []))
        .catch(error => console.error('Error fetching doctors:', error));
    } else {
      setDoctors([]);
    }
  }, [form.department]);

  // Fetch available days when doctor changes
  useEffect(() => {
    if (form.doctor) {
      fetchWithToken(`${config.API_BASE_URL}/api/doctoravailable/${form.doctor}/`)
        .then(response => response.json())
        .then(data => {
          const days = Object.keys(data).filter(day => data[day]);
          setAvailableDays(days.map(day => day.toLowerCase()));
        })
        .catch(error => console.error('Error fetching available days:', error));
    } else {
      setAvailableDays([]);
    }
  }, [form.doctor]);

  // Form handlers
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };
  const handleDateChange = e => {
    const { value } = e.target;
    setForm({ ...form, date: value });

    if (value) {
      const selectedDate = new Date(value);
      const today = new Date();
      if (selectedDate < today.setHours(0, 0, 0, 0)) {
        setError('You cannot select a past date.');
        return;
      }

      const selectedDay = selectedDate
        .toLocaleDateString('en-US', { weekday: 'long' })
        .toLowerCase();

      if (!availableDays.includes(selectedDay)) {
        setError('The selected date does not match the available days.');
      } else {
        setError('');
      }
    }
  };
 
  const getDaysInMonth = (month, year) => {
    const days = [];
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
  
    // Add blank spaces for days before the first day of the month
    for (let i = 0; i < firstDay.getDay(); i++) {
      days.push(null);
    }
  
    // Add actual days of the month
    for (let day = 1; day <= lastDay.getDate(); day++) {
      days.push(new Date(year, month, day));
    }
  
    return days;
  };
  
  // Function to check if a date is in the future
  const isFutureDate = (date) => {
    const today = new Date();
    return date >= today;
  };
  
  // Function to check if a date is in the past
  const isPastDate = (date) => {
    const today = new Date();
    return date < today;
  };
  
  // Get the days of the current month
  const daysInMonth = getDaysInMonth(currentMonth.getMonth(), currentMonth.getFullYear());
  
  // Handle Previous Month
  const goToPreviousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1)); // Go to previous month
  };
  
  // Handle Next Month
  const goToNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1)); // Go to next month
  };
  
  // Handle Date selection
  const handleDateSelect = (day) => {
    if (day) {
      setSelectedDate(day);
      handleDateChange(day); // Pass the selected date to parent
    }
  };
  const isDateSelectable = (date) => {
    const day = date.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
    const today = new Date();
    return date >= today && availableDays.includes(day); // Disable past dates and unavailable days
  };
  // Function to check if a date is today
const isToday = (date) => {
  const today = new Date();
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
};

 
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!error) {
      // Fetch the access token before making the request
      const accessToken = getAccessToken();
      if (!accessToken) {
        console.error('No access token found. User may not be authenticated.');
        return;
      }

      setShowModal(true);
    }
  };
  // Payment handler
  const handlePayment = async () => {
    const token = getAccessToken();
    if (!token) {
      console.error('No access token found. User may not be authenticated.');
      return;
    }
    const headers = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    };

    try {
      if (paymentMethod === 'razorpay') {
        const { data } = await axios.post(`${config.API_BASE_URL}/api/create-razorpay-order/`, {
          hospital_id: form.hospital,
          department_id: form.department,
          doctor_id: form.doctor,
          date: form.date,
          payment_method: 'razorpay',
        }, { headers });

        const options = {
          key: 'rzp_test_d5VCv4MOwkIpcU',
          amount: data.amount,
          currency: data.currency,
          name: "Hospital Booking",
          description: "Appointment Booking Fee",
          order_id: data.order_id,
          handler: async function (response) {
            await axios.post(`${config.API_BASE_URL}/api/razorpay-payment-success/`, {
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
            }, { headers });

            navigate('/booking_success', { state: { token_number: data.token_number } });
          },
          prefill: {
            name: "SUMISHA PS",
            email: "sumishasudha392@gmail.com",
            contact: "9037235334",
          },
          theme: { color: "#3399cc" },
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
      } else if (paymentMethod === 'wallet') {
        const response = await axios.post(`${config.API_BASE_URL}/api/wallet_payment/`, {
          hospital_id: form.hospital,
          department_id: form.department,
          doctor_id: form.doctor,
          date: form.date,
          payment_method: 'wallet',
        }, { headers });

        if (response.data.success) {
          navigate('/booking_success', { state: { token_number: response.data.booking_id } });
        } else {
          alert(response.data.message);
        }
      }
    } catch (error) {
      console.error("Error during payment", error);
    } finally {
      setShowModal(false);
    }
  };


  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const styles = {
    container: {
      marginLeft: '10px',
      marginTop: '10px',
      padding: '20px',
      display: 'flex',
    },
    formContainer: {
      width: '50%',
      padding: '20px',
      border: '1px solid #ccc',
      borderRadius: '10px',
      boxShadow: '0 0 10px rgba(0,0,0,0.1)',
    },
    formGroup: {
      marginBottom: '15px',
    },
    label: {
      display: 'block',
      marginBottom: '5px',
      fontWeight: 'bold',
    },
    districtContainer: {
      display: 'flex',
      flexWrap: 'wrap', // Allow wrapping for multiple rows
      gap: '10px', // Space between district boxes
      width: '620px', // Adjust width to fit 4 items per row (100px * 4 + gap)
    },
    districtBox: {
      display: 'flex',
      flexDirection: 'column', // Arrange items vertically
      alignItems: 'center', // Center align the name
      width: '100px', // Fixed width for each item
      height: '120px', // Adjust height to accommodate name
      overflow: 'hidden',
      cursor: 'pointer',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      borderRadius: '15px', // Curved corners for the container
      justifyContent: 'center', // Center the text vertically
    },
    select: {
      width: '100%',
      padding: '8px',
      borderRadius: '5px',
      border: '1px solid #ccc',
    },
    button: {
      display: 'block',
      width: '100%',
      padding: '10px',
      borderRadius: '5px',
      border: 'none',
      backgroundColor: 'rgb(40, 155, 145)',
      color: 'white',
      fontSize: '16px',
      cursor: 'pointer',
    },
    dateInput: {
      width: '100%',
      padding: '8px',
      borderRadius: '5px',
      border: '1px solid #ccc',
    },
    error: {
      color: 'red',
      marginBottom: '15px',
    },
    rightcontainer: {
      
      marginLeft: '700px',
      marginTop: '-480px',
      padding: '20px',
      display: 'flex',
    },
    rightformContainer: {
      width: '100%',
      padding: '20px',
      border: '1px solid #ccc',
      borderRadius: '10px',
      boxShadow: '0 0 10px rgba(0,0,0,0.1)',
    },
    modal: {
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: '300px',
      padding: '20px',
      borderRadius: '10px',
      boxShadow: '0 0 10px rgba(0,0,0,0.2)',
      backgroundColor: 'white',
      zIndex: 1000,
    },
    modalBackground: {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0,0,0,0.5)',
      zIndex: 999,
    },
    modalButton: {
      display: 'block',
      width: '100%',
      padding: '10px',
      borderRadius: '5px',
      border: 'none',
      backgroundColor: '#3399cc',
      color: 'white',
      fontSize: '16px',
      cursor: 'pointer',
      marginTop: '10px',
    },
    imageGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)', // Exactly 4 columns per row
      gap: '20px',
      justifyContent: 'center',
    },
    departmentSquare: {
      display: 'flex',
      flexDirection: 'column', // Arrange items vertically
      alignItems: 'center', // Center align the name
      width: '100px', // Fixed width
      height: '120px', // Adjust height to accommodate name
      overflow: 'hidden',
      cursor: 'pointer',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      borderRadius: '15px', // Curved corners for the container
    },
    departmentImage: {
      width: '100%',
      height: '100px', // Reserve space for the image
      objectFit: 'cover', // Ensures the image fits within the square
      borderRadius: '12px 12px 0 0', // Round the top corners only
    },
    doctorName: {
      marginTop: '8px', // Add some spacing between image and name
      fontSize: '14px', // Adjust font size for better readability
      textAlign: 'center',
      color: '#333', // Dark text color for better contrast
    },
    hospitalBox: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      width: '120px',
      marginBottom: '10px',
    },
    imageContainer: {
      width: '100%',
      height: '120px',
      borderRadius: '10px',
      overflow: 'hidden',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      backgroundColor: '#f9f9f9',
    },
    hospitalImage: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
    },
    hospitalName: {
      fontSize: '14px',
      fontWeight: 'bold',
      color: '#333',
      textAlign: 'center',
      marginTop: '8px',
    },
    
  }
  const footerStyle = {
    marginTop: '450px',
  };
  const handleDistrictSelection = (districtId) => {
  console.log(`Selected District ID: ${districtId}`);
  // Further logic to handle the selection
};
  const handleDepartmentSelection = (departmentId) => {
    setForm({ ...form, department: departmentId });
  };
  const handleDoctorSelection = (doctorId) => {
    setForm((prevForm) => ({
      ...prevForm,
      doctor: doctorId, // Update the doctor field in the form
    }));
  };
  
  

  return (
    <div>
     <MedNavbar />
      <div style={styles.container}>
        <div style={styles.formContainer}>
          <h2>Book an Appointment</h2>
          <form onSubmit={handleSubmit}>
              <div style={styles.formGroup}>
                <label style={styles.label}>
                  Districts:
                  <select name="district" value={form.district} onChange={handleChange} style={styles.select}>
                    <option value="">Select District</option>
                    {districts.length > 0 ? (
                      districts.map((district, index) => (
                        <option key={index} value={district}>{district}</option>
                      ))
                    ) : (
                      <option value="">No districts available</option>
                    )}
                  </select>
                </label>
              </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>
                Hospital:
                <select name="hospital" value={form.hospital} onChange={handleChange} style={styles.select}>
                  <option value="">Select Hospital</option>
                  {hospitals.length > 0 ? (
                    hospitals.map((hospital, index) => (
                      <option key={index} value={hospital.id}>{hospital.hospital_name}</option>
                    ))
                  ) : (
                    <option value="">No hospitals available</option>
                  )}
                </select>
              </label>
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>
                Department:
                <select name="department" value={form.department} onChange={handleChange} style={styles.select}>
                  <option value="">Select Department</option>
                  {departments.length > 0 ? (
                    departments.map((department, index) => (
                      <option key={index} value={department.id}>{department.name}</option>
                    ))
                  ) : (
                    <option value="">No departments available</option>
                  )}
                </select>
              </label>
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>
                Doctor:
                <select name="doctor" value={form.doctor} onChange={handleChange} style={styles.select}>
                  <option value="">Select Doctor</option>
                  {doctors.length > 0 ? (
                    doctors.map((doctor, index) => (
                      <option key={index} value={doctor.id}>{doctor.name}</option>
                    ))
                  ) : (
                    <option value="">No doctors available</option>
                  )}
                </select>
              </label>
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>
                Date:
                <input
                  type="date"
                  name="date"
                  value={form.date}
                  onChange={handleDateChange}
                  style={styles.dateInput}
                />
              </label>
            </div>
            {error && <div style={styles.error}>{error}</div>}
            <button type="submit" style={styles.button}>OK</button>
          </form>
        </div>
      </div>

      <div style={styles.rightcontainer}>
  <div style={styles.rightformContainer}>
    {/* <h2>Book an Appointment</h2> */}
    <form onSubmit={handleSubmit}>
      {/* Show District dropdown */}
      {!form.district && (
   <div style={styles.formGroup}>
   <label style={styles.label}>
     District:
     <div style={styles.districtContainer}>
       {districts.length > 0 ? (
         districts.map((district, index) => (
           <div key={index} style={styles.districtBox}>
             {getDistrictImage(district) ? (
               <img
                 src={getDistrictImage(district)}
                 alt={district}
                 style={styles.departmentImage}
               />
             ) : (
               <div>No image available</div>
             )}
             <p style={styles.districtName}>{district}</p>
           </div>
         ))
       ) : (
         <div style={styles.districtBox}>No districts available</div>
       )}
     </div>
   </label>
 </div>
)}

      {/* Show Hospital dropdown only if a district is selected */}
      {form.district && !form.hospital && (
  <div style={styles.formGroup}>
    <label style={styles.label}>
      Select Hospital:
    </label>
    <div style={styles.districtContainer}>
      {hospitals.length > 0 ? (
        hospitals.map((hospital, index) => (
          <div key={index} style={styles.hospitalBox}>
            <div style={styles.imageContainer}>
              <img
                src={getHospitalImage(hospital)}
                alt={hospital.hospital_name}
                style={styles.hospitalImage}
              />
            </div>
            <p style={styles.hospitalName}>{hospital.hospital_name}</p>
          </div>
        ))
      ) : (
        <div style={styles.hospitalBox}>
          <p>No hospitals available</p>
        </div>
      )}
    </div>
  </div>
)}


      {/* Show Department dropdown only if a hospital is selected */}
{form.hospital && !form.department && (
  <div style={styles.formGroup}>
    <label style={styles.label}>
      Select Department:
    </label>
    <div style={styles.imageGrid}>
      {departments.length > 0 ? (
        departments.map((department, index) => (
          <div
            key={index}
            style={styles.departmentCircle}
            onClick={() => handleDepartmentSelection(department.id)}
          >
            <img
              src={`${config.API_BASE_URL}${department.image}`} // Correct URL interpolation
              alt={department.name}
              style={styles.departmentImage}
            />
            <p style={styles.departmentName}>{department.name}</p>
          </div>
        ))
      ) : (
        <p>No departments available</p>
      )}
    </div>
  </div>
)}



      {/* Show Doctor dropdown only if a department is selected */}
      {form.department && !form.doctor && (
  <div style={styles.formGroup}>
    <label style={styles.label}>
      Select Doctor:
    </label>
    <div style={styles.imageGrid}>
      {doctors.length > 0 ? (
        doctors.map((doctor, index) => (
          <div
            key={index}
            style={styles.departmentSquare}
            onClick={() => handleDoctorSelection(doctor.id)}
          >
            <img
              src={`${config.API_BASE_URL}${doctor.image}`} 
              alt={doctor.name} 
              style={styles.departmentImage} 
            />
            <p style={styles.doctorName}>{doctor.name}</p>
          </div>
        ))
      ) : (
        <p>No doctors available</p>
      )}
    </div>
  </div>
)}



      {/* Show Date input only if a doctor is selected */}
  {form.doctor && !form.date && (
  <div style={{ textAlign: 'center', fontFamily: 'Arial, sans-serif' }}>
  <label style={{ fontSize: '16px', fontWeight: 'bold' }}>
    Select Date:
  </label>

  <button onClick={goToPreviousMonth}>Previous Month</button>
  <button onClick={goToNextMonth}>Next Month</button>
<h6> Doctor Available Days</h6>
  {/* Month and Year */}
  <h3>
    {currentMonth.toLocaleString('default', { month: 'long' })}{' '}
    {currentMonth.getFullYear()}
  </h3>

  {/* Calendar Grid */}
  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '8px' }}>
    {/* Weekdays */}
    {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((day) => (
      <div key={day} style={{ fontWeight: 'bold', padding: '5px' }}>
        {day}
      </div>
    ))}

    {/* Days */}
    {daysInMonth.map((day, index) => (
      <div
        key={index}
        style={{
          padding: '10px',
          margin: '2px',
          borderRadius: '50%',
          textAlign: 'center',
          backgroundColor:
            day && selectedDate && day.toDateString() === selectedDate.toDateString()
              ? '#28a745'
              : day && isToday(day) // Check if the day is today
              ? '#00FF00' // Green color for today
              : '#f0f0f0',
          color:
            day && selectedDate && day.toDateString() === selectedDate.toDateString()
              ? 'white'
              : day && isToday(day) // Text color for today
              ? 'black'
              : 'black',
          cursor:
            day && isDateSelectable(day)
              ? 'pointer'
              : 'not-allowed', // Disable past dates and future days
          opacity: isPastDate(day) || !isDateSelectable(day) ? 0.5 : 1, // Make past or unavailable days appear disabled
        }}
        onClick={() => day && isDateSelectable(day) && handleDateSelect(day)} // Only allow click for future dates and available days
      >
        {day ? day.getDate() : ''}
      </div>
    ))}
  </div>
</div>
)}



    </form>
  </div>
</div>

      {showModal && (
        <>
          <div style={styles.modalBackground} onClick={handleCloseModal}></div>
          <div style={styles.modal}>
            <h3>Select Payment Method</h3>
            <label>
              <input
                type="radio"
                value="razorpay"
                checked={paymentMethod === 'razorpay'}
                onChange={handlePaymentMethodChange}
              />
              Razorpay
            </label>
            <label>
              <input
                type="radio"
                value="wallet"
                checked={paymentMethod === 'wallet'}
                onChange={handlePaymentMethodChange}
              />
              Wallet
            </label>
            <button style={styles.modalButton} onClick={handlePayment}>Proceed</button>
          </div>
        </>
      )}
      <div style={footerStyle}>
        <Footer />
      </div>
    </div>
  );
}

export default Bookup;
