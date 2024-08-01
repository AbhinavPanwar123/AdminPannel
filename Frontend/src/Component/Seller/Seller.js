import React, { useEffect, useState } from "react";
import "../Seller/Seller.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Seller = () => {
  const navigate = useNavigate();
  const [sellers, setSellers] = useState([]);

  const handleLogout = () => {
    localStorage.clear("email");
    return navigate("/");
  };

  // Fetch sellers list

  const fetchSellers = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/users/getSellersList"
      );
      setSellers(response.data);
    } catch (error) {
      console.error("Error fetching sellers list:", error);
    }
  };

  useEffect(() => {
    fetchSellers();
  }, []);

  // Handle delete seller
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/users/seller/${id}`);
      fetchSellers();
    } catch (error) {
      console.error("Error deleting seller:", error);
    }
  };

  return (
    <div className="sellerPage">
      {/* Header */}
      <header className="header">
        <div className="header-left">
          <h5>E-Commerce</h5>
        </div>
        <div className="header-right">
          <a href="profile" className="header-profile-link">
            <img
              src="https://img.freepik.com/free-vector/illustration-user-avatar-icon_53876-5907.jpg?size=626&ext=jpg&ga=GA1.1.412138692.1719166883&semt=ais_user"
              alt="Profile"
              className="header-profile-logo"
            />
          </a>
          <button
            className="header-button logout-button"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </header>

      <div className="main-layout">
        {/* Sidebar */}
        <aside className="sidebar">
          <ul className="sidebar-menu">
            <li>
              <a href="/dashboard">DASHBOARD</a>
            </li>
            <li>
              <a href="/product">PRODUCTS</a>
            </li>
            <li>
              <a href="/seller">SELLERS</a>
            </li>
          </ul>
        </aside>

        <main className="content">
          <h2>Sellers List</h2>
          <table className="sellers-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Address</th>
                <th>GSTIN</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {sellers.length > 0 ? (
                sellers.map((seller) => (
                  <tr key={seller._id}>
                    <Link to={`/seller/${seller._id}`} />
                    <td>{seller.name}</td>
                    <td>{seller.email}</td>
                    <td>{seller.phone}</td>
                    <td>{seller.address}</td>
                    <td>{seller.gstin}</td>
                    <td>
                      <button className="edit-button">Edit</button>
                      <button
                        className="delete-button"
                        onClick={() => handleDelete(seller._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6">No sellers found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </main>
      </div>
    </div>
  );
};

export default Seller;
