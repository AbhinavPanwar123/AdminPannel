import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const User = () => {
  const [data,setData] = useState('');
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.clear("email")
    return navigate("/")
  };

  return (
    <div>
    <div>
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
            onClick={() => handleLogout()}
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
              <a href="/user">USERS</a>
            </li>
            <li>
              <a href="/product">PRODUCTS</a>
            </li>
            <li>
              <a href="/seller">SELLERS</a>
            </li>
          </ul>
        </aside>
      </div>
    </div>    </div>    </div>
  )
}

export default User
