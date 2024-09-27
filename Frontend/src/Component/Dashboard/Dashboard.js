import React from "react";
import { Grid, Card, CardContent, Typography } from "@mui/material";
import { AttachMoney, Inventory, BarChart } from "@mui/icons-material";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, BarChart as ReBarChart, Bar } from "recharts";
import Layout from "../Layout/Layout";

const lineData = [{ name: "Jan", sales: 4000, stock: 2400, revenue: 2400 }];
const pieData = [{ name: "Electronics", value: 400 }];
const barData = [{ name: "Product A", views: 2400 }];
const COLORS = ["#4B8DF8", "#29B6F6", "#1E88E5", "#1565C0", "#0D47A1"];

const Dashboard = () => {
  return (
    <Layout pageTitle="Dashboard">
      <Grid container spacing={3}>
        {/* Cards */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <AttachMoney fontSize="large" />
              <Typography variant="h6">Total Sales</Typography>
              <Typography variant="h4">$50,000</Typography>
            </CardContent>
          </Card>
        </Grid>
        {/* Line Chart */}
        <Grid item xs={12} md={8}>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={lineData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line dataKey="sales" stroke="#4B8DF8" />
            </LineChart>
          </ResponsiveContainer>
        </Grid>
        {/* Pie Chart */}
        <Grid item xs={12} md={4}>
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} fill="#8884d8">
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Grid>
        {/* Bar Chart */}
        <Grid item xs={12} md={8}>
          <ResponsiveContainer width="100%" height={400}>
            <ReBarChart data={barData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="views" fill="#4B8DF8" />
            </ReBarChart>
          </ResponsiveContainer>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default Dashboard;
