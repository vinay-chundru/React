import React from 'react';
import ReactDOM from 'react-dom/client'; // ✅ not 'react-dom'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import App from './App';
import History from './Pages/History';
import Home from './Pages/Home';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} /> {/* ✅ Proper nested default */}
          <Route path="history" element={<History />} />
        </Route>
      </Routes>
    </Router>
  </React.StrictMode>
);
