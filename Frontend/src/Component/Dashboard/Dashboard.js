import React, { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../Layout/Layout";
import ReactECharts from "echarts-for-react";
import {
  FaDollarSign,
  FaBoxes,
  FaChartLine,
  FaAngleRight,
  FaSellcast,
  FaSalesforce,
} from "react-icons/fa";

const Dashboard = () => {
  const [lineData, setLineData] = useState([]);
  const [pieData, setPieData] = useState([]);
  const [barData, setBarData] = useState([]);

  const COLORS = ["#4B8DF8", "#29B6F6", "#1E88E5", "#1565C0", "#0D47A1"];

  useEffect(() => {
    axios
      .get("http://localhost:5000/users/sales")
      .then((res) => setLineData(res.data))
      .catch((err) => console.error("Error fetching line chart data:", err));

    axios
      .get("http://localhost:5000/users/categories")
      .then((res) => setPieData(res.data))
      .catch((err) => console.error("Error fetching pie chart data:", err));

    axios
      .get("http://localhost:5000/users/product-views")
      .then((res) => setBarData(res.data))
      .catch((err) => console.error("Error fetching bar chart data:", err));
  }, []);

  // Line chart options
  const lineChartOptions = {
    title: {
      text: "Sales Overview",
      textStyle: { color: "#fff", fontSize: 16 },
    },
    tooltip: { trigger: "axis" },
    grid: { top: "20%", bottom: "15%" },
    xAxis: {
      type: "category",
      data: lineData.map((d) => d.name),
      axisLabel: { color: "#fff", fontSize: 12 },
    },
    yAxis: {
      type: "value",
      axisLabel: { color: "#fff", fontSize: 12 },
    },
    series: [
      {
        name: "Sales",
        type: "line",
        data: lineData.map((d) => d.sales),
        smooth: true,
        lineStyle: { color: "#4B8DF8", width: 3 },
        areaStyle: { opacity: 0.3, color: "#4B8DF8" },
      },
    ],
    backgroundColor: "transparent",
  };

  // Pie chart options
  const pieChartOptions = {
    title: {
      text: "Product Categories",
      left: "center",
      textStyle: { color: "#fff", fontSize: 16 },
    },
    tooltip: { trigger: "item", formatter: "{a} <br/>{b}: {c} ({d}%)" },
    legend: {
      bottom: "5%",
      textStyle: { color: "#fff", fontSize: 12 },
    },
    series: [
      {
        name: "Categories",
        type: "pie",
        radius: ["40%", "70%"], // Adjusted radius for a donut look
        avoidLabelOverlap: false,
        label: {
          show: true,
          formatter: "{b}: {d}%",
          textStyle: { fontSize: 12, color: "#fff" },
        },
        labelLine: { length: 15, length2: 10 },
        data: pieData.map((d, index) => ({
          value: d.value,
          name: d.name,
          itemStyle: { color: COLORS[index % COLORS.length] },
        })),
      },
    ],
    backgroundColor: "transparent",
  };

  // Bar chart options
  const barChartOptions = {
    title: {
      text: "Product Views",
      textStyle: { color: "#fff", fontSize: 16 },
    },
    tooltip: { trigger: "axis", axisPointer: { type: "shadow" } },
    grid: { top: "20%", bottom: "15%" },
    xAxis: {
      type: "category",
      data: barData.map((d) => d.name),
      axisLabel: { color: "#fff", fontSize: 12 },
    },
    yAxis: {
      type: "value",
      axisLabel: { color: "#fff", fontSize: 12 },
    },
    series: [
      {
        name: "Views",
        type: "bar",
        data: barData.map((d) => d.views),
        barWidth: "50%",
        itemStyle: {
          color: "#29B6F6",
        },
        label: {
          show: true,
          position: "top",
          formatter: "{c}",
          textStyle: { color: "#fff", fontSize: 12 },
        },
      },
    ],
    backgroundColor: "transparent",
  };

  return (
    <Layout pageTitle="Home">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Total Sales Card */}
        <div className="col-span-1 bg-gradient-to-r from-blue-500 to-blue-800 shadow-md rounded-lg p-6 flex items-center justify-center">
          <div className="text-center text-white">
            <FaChartLine className="text-4xl mb-2" />
            <h3 className="text-xl font-semibold">Total Sales</h3>
            <p className="text-4xl font-bold">$4000</p>
          </div>
        </div>
        {/* Stock Products Card */}
        <div className="col-span-1 bg-gradient-to-r from-green-500 to-green-800 shadow-md rounded-lg p-6 flex items-center justify-center">
          <div className="text-center text-white">
            <FaBoxes className="text-4xl mb-2" />
            <h3 className="text-xl font-semibold">Stock</h3>
            <p className="text-4xl font-bold">2500 Products</p>
            <p>[Available]</p>
          </div>
        </div>
        {/* Total Revenue Card */}
        <div className="col-span-1 bg-gradient-to-r from-purple-500 to-purple-800 shadow-md rounded-lg p-6 flex items-center justify-center">
          <div className="text-center text-white">
            <FaChartLine className="text-4xl mb-2" />
            <h3 className="text-xl font-semibold">Total Revenue</h3>
            <p className="text-4xl font-bold">$2500</p>
          </div>
        </div>

        {/* Pie Chart */}
        <div className="col-span-1 bg-white dark:bg-gray-900 shadow-md rounded-lg p-6">
          <div class="flex justify-center items-center">
            <h5 class="text-xl font-bold leading-none text-gray-900 dark:text-white pe-1">
              Categories
            </h5>
          </div>
          <ReactECharts
            option={pieChartOptions}
            style={{ height: "400px", width: "100%" }}
            theme="dark"
          />
        </div>

        {/* Bar Chart */}
        <div className="col-span-2 bg-white dark:bg-gray-900 shadow-md rounded-lg p-6">
          <div class="flex justify-center items-center">
            <h5 class="text-xl font-bold leading-none text-gray-900 dark:text-white pe-1">
              Product Views
            </h5>
          </div>
          <ReactECharts
            option={barChartOptions}
            style={{ height: "400px", width: "100%" }}
            theme="dark"
          />
        </div>

        {/* Line Chart */}
        <div className="col-span-2 bg-white dark:bg-gray-900 shadow-md rounded-lg p-6">
          <div class="flex justify-center items-center">
            <h5 class="text-xl font-bold leading-none text-gray-900 dark:text-white pe-1">
              Sales
            </h5>
          </div>
          <ReactECharts
            option={lineChartOptions}
            style={{ height: "400px", width: "100%" }}
            theme="dark"
          />
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
