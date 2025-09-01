import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
} from "@mui/material";
import {
  addTransactionEntry,
  removeTransactionEntry,
} from "../redux/transactionSlice";

import {updateTotalExpense,updateCategoricalExpense} from "../redux/expenseSlice"


const TransactionsPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user || {});
  const transactions = useSelector((state) => state.transactions?.transactionList || []);


  // const [newExpense, setNewExpense] = useState({ name: "", category: "", amount: "" });

  const [newExpense, setNewExpense] = useState({
    name: "",
    category: "",  // Default to first category
    amount: "",
  });
  const [filter, setFilter] = useState("All");

 

  // Handle new expense form changes
  const handleChange = (e) => {
    setNewExpense({
      ...newExpense,
      [e.target.name]: e.target.value,
    });
  };

  // Handle category selection separately for Select component
  // const handleCategoryChange = (event) => {
  //   setNewExpense({ ...newExpense, category: event.target.value });
  // };

  // Calculate expenses per category
  // const categoryExpenses = transactions.reduce((acc, txn) => {
  //   acc[txn.category] = (acc[txn.category] || 0) + txn.amount;
  //   return acc;
  // }, {});

  // Handle adding a new transaction
  // const handleAddExpense = (e) => {
  //   e.preventDefault(); // Prevent form from refreshing the page
  
  //   if (!newExpense.name || !newExpense.category || !newExpense.amount) {
  //     alert("All fields are required.");
  //     return;
  //   }
  
  //   dispatch(
  //     addTransactionEntry({
  //       ...newExpense,
  //       id: Date.now().toString(),
  //       amount: Number(newExpense.amount),
  //     })
  //   );
  //   setNewExpense({ name: "", category: "", amount: "" });
  //};
  
  //   const handleAddExpense = (e) => {
  //   e.preventDefault();

  //   if (!newExpense.name.trim() || !newExpense.category || newExpense.amount === "") {
  //     alert("All fields are required.");
  //     return;
  //   }

  //   const amount = parseFloat(newExpense.amount);
  //   if (isNaN(amount) || amount <= 0) {
  //     alert("Expense amount must be a positive number.");
  //     return;
  //   }

  //   if (!(newExpense.category in user.categoricalBudget)) {
  //     alert("Invalid category selected.");
  //     return;
  //   }

  //   // Check if the new expense exceeds the category budget
  //   const totalExpense = transactions
  //     .filter((t) => t.category === newExpense.category)
  //     .reduce((acc, t) => acc + t.amount, 0) + amount;

  //   const categoryBudget = user.categoricalBudget[newExpense.category];

  //   if (totalExpense > categoryBudget) {
  //     alert(`This expense exceeds the budget for ${newExpense.category}.`);
  //     return;
  //   }

  //   dispatch(
  //     addTransactionEntry({
  //       ...newExpense,
  //       id: Date.now().toString(),
  //       amount,
  //     })
  //   );

  //   setNewExpense({ name: "", category: "", amount: "" });
  // };
  
  const handleAddExpense = (e) => {
    e.preventDefault();
  
    console.log("Submitting form with:", newExpense); // ✅ Check if form values are correct
  
    if (!newExpense.name.trim() || !newExpense.category || newExpense.amount === "") {
      console.log("Validation failed: Missing fields");
      return;
    }
  
    const amount = parseFloat(newExpense.amount);
    if (isNaN(amount) || amount <= 0) {
      console.log("Validation failed: Invalid amount");
      return;
    }
  
    if (!(newExpense.category in user.categoricalBudget)) {
      console.log("Validation failed: Invalid category");
      return;
    }
  
    const totalExpense =
      transactions
        .filter((t) => t.category === newExpense.category)
        .reduce((acc, t) => acc + t.amount, 0) + amount;
  
    const categoryBudget = user.categoricalBudget[newExpense.category];
  
    if (totalExpense > categoryBudget) {
      console.log(`Validation failed: Exceeds budget (${totalExpense} > ${categoryBudget})`);
      return;
    }
  
    console.log("Dispatching transaction:", { ...newExpense, amount });
  
    dispatch(
      addTransactionEntry({
        ...newExpense,
        id: Date.now().toString(),
        amount,
      })
    );
  
    console.log("Transaction added. Resetting form.");
    dispatch(updateTotalExpense({ amount, operation: "add" }));
    dispatch(updateCategoricalExpense({ amount, category: newExpense.category, operation: "add" }));
  
    setNewExpense({ name: "", category: "", amount: "" });
  };
  

  // Handle deleting a transaction
  const handleDelete = (id) => {
    dispatch(removeTransactionEntry(id));
  };

  // Filtered transactions based on category
  const filteredTransactions = filter === "All" ? transactions : transactions.filter((t) => t.category === filter);

  return (
    <Container>
    <Container>
    <Typography variant="h4" align="center" sx={{ mt: 3 }}>
        xTracker
      </Typography>
    </Container>
      {/* Header Section */}
      <Container 
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px 20px",
        backgroundColor: "#f5f5f5",
        borderRadius: "8px",
        marginBottom: "20px"
      }}
    >
      {/* Left-aligned title */}
      <Typography variant="h6" sx={{ fontWeight: "bold" }}>
        {user.userName}'s Monthly Expenditure
      </Typography>

      {/* Right-aligned button */}
      <Button
        id="new-update"
        variant="outlined"
        onClick={() => navigate("/update-tracker")}
      >
        New/Update Tracker
      </Button>
    </Container>

      {/* Insights Table */}
     
      <TableContainer component={Paper} sx={{ mt: 2, width: "75%" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Category</TableCell>
              <TableCell>Budget</TableCell>
              <TableCell>Expenses</TableCell>
              <TableCell>Balance</TableCell>
              <TableCell>Limit Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {user.categoricalBudget && Object.entries(user.categoricalBudget).map(([category, budget]) => {
              const totalExpense = transactions
                .filter((t) => t.category === category)
                .reduce((acc, t) => acc + t.amount, 0);
              const balance = budget - totalExpense;
              let statusLabel = "Within";
              let statusColor = "success";

              if (balance < 0) {
                statusLabel = "Exceeded";
                statusColor = "error";
              } else if (balance === 0) {
                statusLabel = "At Limit";
                statusColor = "warning";
              }

              return (
                <TableRow key={category}>
                  <TableCell>{category}</TableCell>
                  <TableCell>${budget}</TableCell>
                  <TableCell>${totalExpense}</TableCell>
                  <TableCell>${balance}</TableCell>
                  <TableCell>
                    <Chip label={statusLabel} color={statusColor} />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      {/* New Expense Form */}
      {/* <Typography variant="h5" sx={{ mt: 3 }}>New Expense</Typography>
      <Button variant="contained" sx={{ mt: 1 }} onClick={handleOpenModal}>
        Add Expense
      </Button> */}

      {/* New Expense Modal */}
      
      {/* <Dialog open={openModal} onClose={handleCloseModal}>
        <DialogTitle>Add New Expense</DialogTitle>
        <DialogContent>
          <TextField label="Expense Name" name="name" fullWidth margin="dense" value={newExpense.name} onChange={handleChange} />
          <Select name="category" fullWidth value={newExpense.category} onChange={handleCategoryChange} sx={{ mt: 2 }}>
            <MenuItem value="">Select Category</MenuItem>
            {user.categoricalBudget && Object.keys(user.categoricalBudget).map((cat) => (
              <MenuItem key={cat} value={cat}>{cat}</MenuItem>
            ))}
          </Select>
          <TextField label="Amount" name="amount" fullWidth type="number" margin="dense" value={newExpense.amount} onChange={handleChange} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal}>Cancel</Button>
          <Button variant="contained" onClick={handleAddExpense}>Submit</Button>
        </DialogActions>
      </Dialog> */}

       {/*  New Expense Form Title */}
       

{/* New Expense Form */}
<Container>
<div style={{ padding: "10px", maxWidth: "400px", marginTop: "20px", borderRadius: "5px" }}>
  {/* Title with correct ID */}
  <div className="title" id="title" style={{ fontWeight: "bold", marginBottom: "10px" }}>
    New Expense Form
  </div>

  {/* Form with correct ID */}
  <form name="expense-form1" className="expense-form1" id="expense-form1" onSubmit={handleAddExpense} style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
    <div className="expense-form-input">
      <div>
      <label htmlFor="expense-name" style={{ marginRight: "8px", width: "120px" }}>Expense Name:</label>
      <input
        type="text"
        id="expense-name"
        name="name"
        value={newExpense.name}
        onChange={handleChange}
        style={{ flex: 1 }}
      />
      </div>
      
     <div>
     <label htmlFor="category-select" style={{ marginRight: "8px", width: "120px" }}>Select category:</label>
      <select
        id="category-select"
        name="category"
        value={newExpense.category}
        onChange={handleChange}
        style={{ flex: 1 }}
      >
        <option value="">--select--</option>
        {user.categoricalBudget &&
          [...Object.keys(user.categoricalBudget)].map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
      </select>
     </div>

    <div>
    <label htmlFor="expense-amount" style={{ marginRight: "8px", width: "120px" }}>Expense Amount:</label>
      <input
        type="number"
        id="expense-amount"
        name="amount"
        value={newExpense.amount}
        onChange={handleChange}
        style={{ flex: 1 }}
      />
    </div>

    </div>

    <button type="submit" style={{ marginTop: "8px", padding: "5px", cursor: "pointer" }}>Submit</button>
  </form>
</div>
</Container>


      {/* Filters */}
      <Typography variant="h6" sx={{ mt: 3 }}>Filters:</Typography>
      {["All", ...(user.categoricalBudget ? Object.keys(user.categoricalBudget) : [])].map((cat) => (
        <Button key={cat} variant="outlined" sx={{ m: 1 }} onClick={() => setFilter(cat)}>
          {cat}
        </Button>
      ))}

      {/* Expenses Table */}
      <TableContainer component={Paper} sx={{ mt: 2, width: "75%" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Transaction</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredTransactions.map((t, index) => (
              <TableRow key={t.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{t.name}</TableCell>
                <TableCell>{t.category}</TableCell>
                <TableCell>${t.amount}</TableCell>
                <TableCell>
                  <Button variant="contained" color="error" onClick={() => handleDelete(t.id)}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default TransactionsPage;
