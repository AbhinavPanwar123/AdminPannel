import React from 'react';
import '../Dashboard/Dash.css'; // Import CSS file for styling
import { useNavigate } from 'react-router-dom';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell
} from 'recharts';

const data = [
  { name: 'Jan', users: 400 },
  { name: 'Feb', users: 300 },
  { name: 'Mar', users: 200 },
  { name: 'Apr', users: 278 },
  { name: 'May', users: 189 },
  { name: 'Jun', users: 239 },
  { name: 'Jul', users: 349 },
  { name: 'Aug', users: 200 },
  { name: 'Sep', users: 300 },
  { name: 'Oct', users: 400 },
  { name: 'Nov', users: 500 },
  { name: 'Dec', users: 600 },
];

const pieData = [
  { name: 'Admin', value: 2 },
  { name: 'Seller', value: 50 },
  { name: 'Customer', value: 300 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const Dashboard = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.clear('email');
    return navigate('/')
  }
  
  return (
    <div className="dashboard">
      {/* Header */}
      <header className="header">
        <div className="header-left">
          <h5>E-Commerce</h5>
        </div>
        <div className="header-right">
          <a href="profile" className="header-profile-link">
            <img src="https://img.freepik.com/free-vector/illustration-user-avatar-icon_53876-5907.jpg?size=626&ext=jpg&ga=GA1.1.412138692.1719166883&semt=ais_user" alt="Profile" className="header-profile-logo" />
          </a>
          <button className="header-button logout-button" onClick={() => handleLogout()}>Logout</button>
        </div>
      </header>

      <div className="main-layout">
        {/* Sidebar */}
        <aside className="sidebar">
          <ul className="sidebar-menu">
            <li><a href="/dashboard">DASHBOARD</a></li>
            <li><a href="/product">PRODUCTS</a></li>
            <li><a href="/seller">SELLERS</a></li>
          </ul>
        </aside>

        {/* Main Content */}
        <main className="content">
          <div className="charts">
            <div className="line-chart">
              <h3>Users Over Time</h3>
              <LineChart width={500} height={300} data={data}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="users" stroke="#8884d8" activeDot={{ r: 8 }} />
              </LineChart>
            </div>

            <div className="pie-chart">
              <h3>User Roles Distribution</h3>
              <PieChart width={400} height={400}>
                <Pie
                  data={pieData}
                  cx={200}
                  cy={200}
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
