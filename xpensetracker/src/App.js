import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./components/ExpenseForm.js";
import TransactionsPage from "./components/TransactionsPage";
import UpdateTrackerPage from "./components/UpdateTracker.js";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/tracker" element={<TransactionsPage />} />
        <Route path="/update-tracker" element={<UpdateTrackerPage />} />
      </Routes>
    </Router>
  );
}

export default App;
