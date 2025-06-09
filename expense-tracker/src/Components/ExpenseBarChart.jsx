// ExpenseBarChart.js
import React from "react";
import "../Styles/ExpenseBarChart.css";

const categories = ["Food", "Entertainment", "Travel"];
const categoryColors = {
  Food: "#A020F0", // Purple
  Entertainment: "#A020F0", // Orange
  Travel: "#A020F0", // Yellow
};

const ExpenseBarChart = ({ expenses }) => {
  // Step 1: Aggregate totals
  const categoryTotals = {
    Food: 0,
    Entertainment: 0,
    Travel: 0,
  };

  expenses.forEach((exp) => {
    if (categories.includes(exp.category)) {
      categoryTotals[exp.category] += parseFloat(exp.price);
    }
  });

  // Step 2: Convert to array and sort by expense descending
  const sortedCategories = Object.entries(categoryTotals).sort(
    (a, b) => b[1] - a[1]
  ); // Sort by expense value descending

  const maxExpense = Math.max(...Object.values(categoryTotals), 1); // Prevent divide by 0

  return (
    <div className=".right-expense-bar">
      {/* <h3 className="chart-title">Top Expenses</h3> */}
      {sortedCategories.map(([category, value]) => {
        const widthPercent = (value / maxExpense) * 100;

        return (
          <div key={category} className="bar-row">
            <span className="bar-label">{category}</span>
            <div className="bar-track">
              <div
                className="bar-fill"
                style={{
                  width: `${widthPercent}%`,
                  backgroundColor: categoryColors[category],
                }}
              ></div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ExpenseBarChart;
