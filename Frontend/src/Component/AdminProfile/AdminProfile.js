import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './AdminProfile.css';
import Layout from '../Layout/Layout';

const AdminProfile = () => {
    const navigate = useNavigate();
    const [data, setData] = useState({
        name : '',
        email : ''
    });

      // Removed dark mode state
  const [isDarkMode] = useState(false); // Keeping it for layout consistency
 
    useEffect(()=>{
        const FetchAdminData = async() => {
            try {
                const response = await axios.get('http://localhost:5000/users/adminData');
                console.log(response.data.admin);
                setData(response.data.admin[0])
            } catch (error) {
                console.error("Error fetching Admin details:", error);
            }
        } 
        FetchAdminData();
    },[])
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setData((prevAdmin) => ({
            ...prevAdmin,
            [name] : value
        }));
    };

    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            await axios.put('http://localhost:5000/users/adminUpdate', data);
            navigate('/dashboard')
        } catch (error) {
            console.log("Error updating Admin details:", error)
        }
    }

  return (
        <Layout pageTitle="Seller Profile">
        <div className={`profile-container ${isDarkMode ? 'dark' : 'light'}`}> {/* Apply dark class based on state */}
          <div className="profile-card"> {/* Add this for hover effects */}
            <h2 className="profile-title">Admin Profile</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-300">Name:</label>
                <input
                  type="text"
                  name="name"
                  value={data.name}
                  onChange={handleChange}
                  required
                  className="input-field"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-300">Email:</label>
                <input
                  type="email"
                  name="email"
                  value={data.email}
                  onChange={handleChange}
                  required
                  className="input-field"
                />
              </div>
              <div className="profile-actions">
                <button
                  type="submit"
                  className="save-btn"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </Layout>
  )
}

export default AdminProfile
