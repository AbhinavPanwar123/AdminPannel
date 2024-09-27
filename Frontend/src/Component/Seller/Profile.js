import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Layout from "../Layout/Layout"; 
import './Profile.css'; 

const Profile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [seller, setSeller] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    gstin: "",
  });

  // Removed dark mode state
  const [isDarkMode] = useState(false); // Keeping it for layout consistency

  useEffect(() => {
    const fetchSeller = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/users/getSeller/${id}`);
        setSeller(response.data.data);
      } catch (error) {
        console.error("Error fetching seller details:", error);
      }
    };

    fetchSeller();
  }, [id]);

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/users/deleteSeller/${id}`);
      navigate("/seller");
    } catch (error) {
      console.error("Error deleting seller:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSeller((prevSeller) => ({
      ...prevSeller,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/users/updateSeller/${id}`, seller);
      navigate("/seller");
    } catch (error) {
      console.error("Error updating seller details:", error);
    }
  };

  return (
    <Layout pageTitle="Seller Profile">
      <div className={`profile-container ${isDarkMode ? 'dark' : 'light'}`}> {/* Apply dark class based on state */}
        <div className="profile-card"> {/* Add this for hover effects */}
          <h2 className="profile-title">Seller Profile</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-300">Name:</label>
              <input
                type="text"
                name="name"
                value={seller.name}
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
                value={seller.email}
                onChange={handleChange}
                required
                className="input-field"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-300">Phone:</label>
              <input
                type="text"
                name="phone"
                value={seller.phone}
                onChange={handleChange}
                required
                className="input-field"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-300">Address:</label>
              <input
                type="text"
                name="address"
                value={seller.address}
                onChange={handleChange}
                required
                className="input-field"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-300">GSTIN:</label>
              <input
                type="text"
                name="gstin"
                value={seller.gstin}
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
              <button
                type="button"
                className="delete-btn"
                onClick={handleDelete}
              >
                Delete Seller
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
