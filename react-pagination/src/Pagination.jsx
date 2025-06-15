// App.js
import React, { useEffect, useState } from "react";

const Pagination = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await fetch(
        "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
      );
      if (!res.ok) {
        throw new Error("Failed");
      }
      const json = await res.json();
      setData(json);
    } catch (error) {
      alert("failed to fetch data");
    }
  };

  const totalPages = Math.ceil(data.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const currentData = data.slice(startIndex, startIndex + pageSize);

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h2>Employee Data Table</h2>
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

        <span
          style={{
            marginRight: "10px",
            backgroundColor: "#00896c",
            color: "white",
            padding: "8px 14px",
            fontWeight: "bold",
            fontSize: "16px"
          }}
        >
         {currentPage}
        </span>
        
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

export default Pagination;
