import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './css/HospitalRequests.css'
import config from '../../config';
import AdminPanel from './AdminPanel';

const HospitalDepartments = () => {
    const { id } = useParams(); // Get hospital id from URL
    const [departments, setDepartments] = useState([]);

    useEffect(() => {
        const fetchDepartments = async () => {
            try {
                const response = await axios.get(`${config.API_BASE_URL}/api/hospitaldepartments1/${id}/`);
                setDepartments(response.data);
            } catch (error) {
                console.error('Error fetching departments:', error);
            }
        };

        fetchDepartments();
    }, [id]);

    return (
        <div>
            <AdminPanel />
        
        <div >
            <h1>Departments</h1>
            <div className="departments-container">
                {departments.map(department => (
                    <div key={department.id} className="department-card">
                        <img src={`${config.API_BASE_URL}${department.image}`} alt={department.name} style={{ width: '100px', height: '100px', objectFit: 'cover' }} />
                        <h4>{department.name}</h4>
                    </div>
                ))}
            </div>
        </div>
        </div>
    );
};

export default HospitalDepartments;
