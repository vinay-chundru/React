// PaginationApp.js
import React, { useState, useEffect } from "react";

const PaginationApp = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState(null);
  const pageSize = 10;

  const totalPages = Math.max(1, Math.ceil(data.length / pageSize));
  const startIndex = (currentPage - 1) * pageSize;
  const currentData = data.slice(startIndex, startIndex + pageSize);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
        );
        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await res.json();
        setData(data);
        setCurrentPage(1); // reset to first page on fetch
      } catch (err) {
        setError(err.message);
        alert("Failed to fetch data");
      }
    };
    fetchData();
  }, []);

  const handlePrevious = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNext = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h2>Employee Data Table</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <table
        style={{
          width: "90%",
          margin: "auto",
          borderCollapse: "collapse",
          boxShadow: "0 0 10px rgba(0,0,0,0.1)",
        }}
      >
        <thead>
          <tr style={{ backgroundColor: "#00896c", color: "white" }}>
            <th style={{ padding: "10px", textAlign: "left" }}>ID</th>
            <th style={{ padding: "10px", textAlign: "left" }}>Name</th>
            <th style={{ padding: "10px", textAlign: "left" }}>Email</th>
            <th style={{ padding: "10px", textAlign: "left" }}>Role</th>
          </tr>
        </thead>
        <tbody>
          {currentData.map((emp) => (
            <tr key={emp.id} style={{ borderBottom: "1px solid #ccc" }}>
              <td style={{ padding: "10px", textAlign: "left" }}>{emp.id}</td>
              <td style={{ padding: "10px", textAlign: "left" }}>{emp.name}</td>
              <td style={{ padding: "10px", textAlign: "left" }}>
                {emp.email}
              </td>
              <td style={{ padding: "10px", textAlign: "left" }}>{emp.role}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ marginTop: "20px" }}>
        <button
          onClick={handlePrevious}
          disabled={currentPage === 1}
          style={{
            marginRight: "10px",
            padding: "8px 16px",
            backgroundColor: "#00896c",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: currentPage === 1 ? "not-allowed" : "pointer",
          }}
        >
          Previous
        </button>

        <div
          style={{
            display: "inline-block",
            marginRight: "10px",
            backgroundColor: "#00896c",
            color: "white",
            padding: "8px 14px",
            fontWeight: "bold",
            fontSize: "16px",
            borderRadius: "5px",
          }}
        >
          {currentPage} 
        </div>

        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          style={{
            padding: "8px 16px",
            backgroundColor: "#00896c",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: currentPage === totalPages ? "not-allowed" : "pointer",
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default PaginationApp;
