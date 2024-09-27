import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Layout from "../Layout/Layout";

const Seller = () => {
  const [sellerData, setSellerData] = useState([]);
  const navigate = useNavigate();

  // Fetch seller data
  useEffect(() => {
    const fetchSellerData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/users/getSellersList");
        setSellerData(response.data.sellers);
      } catch (error) {
        console.error("Error fetching seller data", error);
      }
    };

    fetchSellerData();
  }, []);

  // Handle navigation to seller profile
  const handleViewProfile = (sellerId) => {
    navigate(`/seller/profile/${sellerId}`);
  };

  return (
    <Layout pageTitle="Seller List">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {sellerData.map((seller) => (
          <div key={seller._id} className="bg-white dark:bg-gray-800 shadow-lg rounded-lg transition-transform transform hover:scale-105">
            <div className="p-4">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                {seller.name}
              </h2>
              <p className="text-gray-700 dark:text-gray-300">
                Email: {seller.email}
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                Phone: {seller.phone}
              </p>
              <button 
                className="mt-2 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded"
                onClick={() => handleViewProfile(seller._id)}
              >
                View Profile
              </button>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default Seller;
