import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateBudget, resetAllBudget } from "../redux/userSlice";
import { Container, Typography, Button } from "@mui/material";

const UpdateTrackerPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  const [userName, setUserName] = useState(user.userName);
  const [monthlyBudget, setMonthlyBudget] = useState(user.monthlyBudget);
  const [categoryBudgets, setCategoryBudgets] = useState(user.categoricalBudget);

  useEffect(() => {
    setUserName(user.userName);
    setMonthlyBudget(user.monthlyBudget);
    setCategoryBudgets(user.categoricalBudget);
  }, [user]);

  // Auto-adjust "Others" category
  useEffect(() => {
    if (monthlyBudget) {
      const numTotalBudget = Number(monthlyBudget);
      const categorySum = ["food", "travel", "entertainment"].reduce(
        (sum, cat) => sum + Number(categoryBudgets[cat] || 0),
        0
      );

      const remainingBudget = numTotalBudget - categorySum;
      if (remainingBudget !== categoryBudgets.others) {
        setCategoryBudgets((prev) => ({
          ...prev,
          others: remainingBudget > 0 ? remainingBudget : 0,
        }));
      }
    }
  }, [monthlyBudget, categoryBudgets.food, categoryBudgets.travel, categoryBudgets.entertainment]);

  const handleCategoryChange = (category, value) => {
    setCategoryBudgets((prev) => ({
      ...prev,
      [category]: value === "" ? "" : Number(value),
    }));
  };

  const handleUpdateBudget = () => {
    if (!userName.trim()) {
      alert("User name cannot be empty.");
      return;
    }

    if (!monthlyBudget || monthlyBudget <= 0) {
      alert("The total budget must be greater than 0.");
      return;
    }

    const categoryTotal = ["food", "travel", "entertainment"].reduce(
      (sum, cat) => sum + (categoryBudgets[cat] === "" ? 0 : Number(categoryBudgets[cat])),
      0
    );

    if (categoryTotal > monthlyBudget) {
      alert("The sum of all categories must not exceed the total budget.");
      return;
    }

    dispatch(updateBudget({ userName, monthlyBudget, categoricalBudget: categoryBudgets }));
    navigate('/tracker');
  };

  const handleStartNewTracker = () => {
    if (window.confirm("This will delete all previous transactions. Proceed?")) {
      dispatch(resetAllBudget());
      setUserName("");
      setMonthlyBudget("");
      setCategoryBudgets({ food: "", travel: "", entertainment: "", others: "" });
    }
  };

  const handleGoBack = () => {
    navigate('/tracker');
  }

  return (
    <Container>
      <Typography variant="h4" align="center" sx={{ mt: 3 }}>
        Welcome to your Expense Tracker
      </Typography>
      <Typography variant="body1" align="center">
        Please fill in the below form to start tracking
      </Typography>

      <div style={{ margin: "20px auto", maxWidth: 500, padding: 20, border: "1px solid #ccc" }}>
        {/* User Name Input */}
        <div style={{ marginBottom: "10px", display: "block" }}>
          <label htmlFor="name">Enter your name:</label>
          <input
            id="name"
            name="name"
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            required
          />
        </div>

        {/* Monthly Budget Input */}
        <div style={{ marginBottom: "10px", display: "block" }}>
          <label htmlFor="budget">Enter your monthly budget:</label>
          <input
            id="budget"
            name="totalBudget"
            type="number"
            value={monthlyBudget}
            onChange={(e) => setMonthlyBudget(e.target.value === "" ? "" : Number(e.target.value))}
            required
          />
        </div>

        {/* Category Budgets Table */}
        <table>
          <tbody>
            {["food", "travel", "entertainment"].map((category) => (
              <tr key={category}>
                <td>{category.charAt(0).toUpperCase() + category.slice(1)}</td>
                <td>
                  <input
                    id={category}
                    name={category}
                    type="number"
                    value={categoryBudgets[category] || ""}
                    onChange={(e) => handleCategoryChange(category, e.target.value)}
                    required
                  />
                </td>
              </tr>
            ))}
            {/* Others (Auto-Calculated) */}
            {/* <tr>
              <td>Others</td>
              <td>
                <input id="others" name="others" type="number" value={categoryBudgets.others} disabled />
              </td>
            </tr> */}
          </tbody>
        </table>

        {/* Buttons */}
        <Button id="new-update" variant="contained" sx={{ mt: 3, mr: 2 }} onClick={handleUpdateBudget}>
          Update budget
        </Button>

        <Button id="clear" variant="contained" color="error" sx={{ mt: 2, mr: 1 }} onClick={handleStartNewTracker}>
          Start new tracker
        </Button>

        <Button variant="outlined" sx={{ mt: 2 }} onClick={handleGoBack}>
          Go Back
        </Button>
      </div>
    </Container>
  );
};

export default UpdateTrackerPage;
