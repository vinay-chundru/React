import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateUserName, updateMonthlyBudget, updateCategoricalBudget, resetAllBudget } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
} from "@mui/material";

const LandingPage = () => {
  const [name, setName] = useState("");
  const [totalBudget, setTotalBudget] = useState("");
  const [categories, setCategories] = useState({ food: "", travel: "", entertainment: "", others: "", });
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();


  useEffect(() => {
    if (totalBudget) {
      const numTotalBudget = Number(totalBudget);
      const categorySum = Object.entries(categories)
        .filter(([key]) => key !== "others")
        .reduce((sum, [, value]) => sum + Number(value || 0), 0);
  
      const remainingBudget = numTotalBudget - categorySum;
      setCategories((prev) => ({
        ...prev,
        others: remainingBudget > 0 ? remainingBudget : 0,
      }));
    }
  }, [totalBudget, categories.food, categories.travel, categories.entertainment]);
  // Don't include `categories.others`
  

  const handleChange = (e) => {
    setCategories({ ...categories, [e.target.name]: e.target.value });
  };


  const handleSubmit = (e) => {
    e.preventDefault();
  
    const numTotalBudget = Number(totalBudget);
    const categorySum = Object.values(categories).reduce(
      (sum, val) => sum + Number(val || 0),
      0
    );
  
    if (!name.trim() || isNaN(numTotalBudget) || numTotalBudget <= 0) {
      setError("Please enter a valid name and budget.");
      return;
    }
  
    if (!name || !totalBudget || Object.values(categories).some((b) => b === "")) {
      setError("All fields must be filled.");
      return;
    }
  
    if (numTotalBudget <= 0) {
      setError("Total budget must be greater than zero.");
      return;
    }
  
    if (categorySum > numTotalBudget) {
      alert("Total Categorical budget should not exceed monthly budget");
      return;
    }
  
    // Ensure all values are numbers
    const numericCategories = Object.fromEntries(
      Object.entries(categories).map(([key, value]) => [key, Number(value || 0)])
    );
  
    dispatch(updateUserName(name));
    dispatch(updateMonthlyBudget(numTotalBudget));
    dispatch(updateCategoricalBudget(numericCategories)); // Send numeric values
  
  
    setError("");
    navigate('/tracker');
  };
  
  

  return (
   <Container>
      <Typography variant="h4" align="center" sx={{ mt: 3 }}>
        xTracker
      </Typography>
      <Typography variant="body1" align="center">
        Welcome to your own Expense Tracker
      </Typography>

      <form name="landing-page-form" onSubmit ={handleSubmit} style={{ margin: "20px auto", maxWidth: 500, padding: 20, border: "1px solid #ccc" }}>
      <div>
       <label htmlFor="name">Enter your name:</label>    
        <input
          id="name"
          name="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required/>
      </div>

      <label htmlFor="budget">Enter your monthly budget:</label>
        <input
          id="budget"
          name="totalBudget"
          type="number"
          value={totalBudget}
          onChange={(e) => setTotalBudget(e.target.value)}
          required
        />  

    <h3>Fill your monthly categorical budget:</h3>
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
                 value={categories[category]}
                 onChange={handleChange}
                 required/>
            </td>
         </tr>
        ))}
      </tbody>
   </table>


        {error && (
          <Typography variant="body2" color="error" sx={{ mt: 2 }}>
            {error}
          </Typography>
        )}

        
        <Button type="submit" variant="contained" sx={{ mt: 3 ,mr: 3}} >
         Submit
        </Button>

        <Button id="clear" variant="contained" sx={{ mt: 3 }} type="reset" onClick={() => setCategories({ food: "", travel: "", entertainment: "", others: "" })}>
         Reset
        </Button>
     </form>
   </Container>
  );
};

export default LandingPage;
