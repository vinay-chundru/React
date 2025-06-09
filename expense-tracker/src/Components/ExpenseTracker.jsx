// App.js
import React, { useState, useEffect } from "react";
import ExpensePieChart from "./ExpensePieChart";
import ExpenseBarChart from "./ExpenseBarChart";
import "../Styles/ExpenseTracker.css";
import RecentTransactions from "./RecentTransactions";

const ExpenseTracker = () => {
  const [wallet, setWallet] = useState(() => {
    const saved = localStorage.getItem("wallet");
    return saved ? parseFloat(saved) : 5000;
  });

  const [expenses, setExpenses] = useState(() => {
    const saved = localStorage.getItem("expenses");
    return saved ? JSON.parse(saved) : [];
  });

  const [showIncomeModal, setShowIncomeModal] = useState(false);
  const [showExpenseModal, setShowExpenseModal] = useState(false);

  const [newBalance, setNewBalance] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    category: "",
    date: "",
  });

  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    localStorage.setItem("wallet", wallet);
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [wallet, expenses]);

  const getTotalExpenses = () => {
    return expenses.reduce((acc, curr) => acc + parseFloat(curr.price), 0);
  };

  const handleAddIncome = (e) => {
    e.preventDefault();
    if (newBalance === "" || parseFloat(newBalance) <= 0) {
      alert("Enter a valid amount.");
      return;
    }
    setWallet(wallet + parseFloat(newBalance));
    setNewBalance("");
    setShowIncomeModal(false);
  };

  const handleAddExpense = (e) => {
    e.preventDefault();
    const { title, price, category, date } = formData;
    if (!title || !price || !category || !date) {
      alert("Please fill in all fields.");
      return;
    }
    if (parseFloat(price) > wallet) {
      alert("Insufficient wallet balance.");
      return;
    }

    const expense = {
      title,
      price: parseFloat(price),
      category,
      date,
    };

    let updatedExpenses = [...expenses];
    if (editIndex !== null) {
      const oldPrice = updatedExpenses[editIndex].price;
      updatedExpenses[editIndex] = expense;
      setWallet(wallet + oldPrice - parseFloat(price));
    } else {
      updatedExpenses.push(expense);
      setWallet(wallet - parseFloat(price));
    }

    setExpenses(updatedExpenses);
    setFormData({ title: "", price: "", category: "", date: "" });
    setEditIndex(null);
    setShowExpenseModal(false);
  };

  const handleDelete = (index) => {
    const deleted = expenses[index];
    setExpenses(expenses.filter((_, i) => i !== index));
    setWallet(wallet + parseFloat(deleted.price));
  };

  const handleEdit = (index) => {
    const exp = expenses[index];
    setFormData(exp);
    setEditIndex(index);
    setShowExpenseModal(true);
  };

  return (
    <div className="app-container">
      <h1>Expense Tracker</h1>

      <div className="top-section">
        <div className="balance-box">
          <h3>Wallet Balance: ₹{wallet.toFixed(2)}</h3>
          <button type="button" onClick={() => setShowIncomeModal(true)}>
            + Add Income
          </button>
        </div>

        <div className="expense-box">
          <h3>Expenses: ₹{getTotalExpenses().toFixed(2)}</h3>
          <button type="button" onClick={() => setShowExpenseModal(true)}>
            + Add Expense
          </button>
        </div>

        <div className="piechart-box">
          <ExpensePieChart expenses={expenses} />
        </div>
      </div>

      {showIncomeModal && (
        <div className="modal">
          <form onSubmit={handleAddIncome}>
            <input
              type="number"
              placeholder="Income Amount"
              value={newBalance}
              onChange={(e) => setNewBalance(e.target.value)}
            />
            <button type="submit">Add Balance</button>
            <button type="button" onClick={() => setShowIncomeModal(false)}>
              Cancel
            </button>
          </form>
        </div>
      )}

      {showExpenseModal && (
        <div className="modal">
          <form onSubmit={handleAddExpense} id="expense-form1">
            <input
              name="title"
              id="expense-name"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              placeholder="Expense Title"
            />
            <input
              name="price"
              id="expense-amount"
              type="number"
              value={formData.price}
              onChange={(e) =>
                setFormData({ ...formData, price: e.target.value })
              }
              placeholder="Expense Amount"
            />
            <select
              name="category"
              id="category-select"
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
            >
              <option value="">Select Category</option>
              <option value="Food">Food</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Travel">Travel</option>
            </select>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={(e) =>
                setFormData({ ...formData, date: e.target.value })
              }
            />
            <button type="submit">Add Expense</button>
            <button
              type="button"
              onClick={() => {
                setFormData({ title: "", price: "", category: "", date: "" });
                setEditIndex(null);
                setShowExpenseModal(false);
              }}
            >
              Cancel
            </button>
          </form>
        </div>
      )}

      <div className="bottom-section">
        <div className="left">
          <h3>Recent Transactions</h3>
          {expenses.length === 0 ? (
              <div style={{
                     display: "flex",
                     alignItems: "center",
                     justifyContent: "center",
                     textAlign: "center",
                     marginTop: "1rem",
                     color: "gray",
                     background: "white",
                     minHeight: "150px",
                     borderRadius: "12px",
  }}>
               No Recent Transactions
              </div>
          ) : (
          <div className="left-expense-list">
            <RecentTransactions
              expenses={expenses}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
            />
          </div>)}
        </div>

        <div className="right">
          <h3>Top Expenses</h3>
          <div className="right-expense-bar">
            <ExpenseBarChart expenses={expenses} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpenseTracker;
