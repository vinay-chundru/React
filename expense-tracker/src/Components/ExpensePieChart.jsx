// ExpensePieChart.js
import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import "../Styles/ExpensePieChart.css";

ChartJS.register(ArcElement, Tooltip, Legend);

const categoryColors = {
  Food: "#A020F0", // Purple
  Entertainment: "#FF8C00", // Orange
  Travel: "#FFD700", // Yellow
};

const ExpensePieChart = ({ expenses }) => {
  const categories = ["Food", "Entertainment", "Travel"];
  const dataByCategory = {
    Food: 0,
    Entertainment: 0,
    Travel: 0,
  };

  expenses.forEach((exp) => {
    if (categories.includes(exp.category)) {
      dataByCategory[exp.category] += parseFloat(exp.price);
    }
  });

  const hasExpenses = expenses.length > 0;

  const chartData = {
    labels: categories,
    datasets: [
      {
        data: hasExpenses
          ? categories.map((cat) => dataByCategory[cat])
          : categories.map(() => 0), // placeholder data
        backgroundColor: categories.map((cat) => categoryColors[cat]),
        borderWidth: 0,
      },
    ],
  };

  const options = {
    plugins: {
      legend: { display: false },
    },
  };

  return (
    <div className="expense-pie-container">
      <div className="pie-chart-wrapper">
      <Pie
        data={chartData}
        options={{
          ...options,
          maintainAspectRatio: false,
        }}
        height={180}
        width={180}
      />
    </div>

      <div className="legend-container">
        {categories.map((cat) => (
          <div key={cat} className="legend-item">
            <span
              className="legend-color"
              style={{ backgroundColor: categoryColors[cat] }}
            ></span>
            <span className="legend-label">{cat}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExpensePieChart;
