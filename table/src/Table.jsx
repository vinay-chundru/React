import React, { useState } from "react";

const Table = () => {
  const [data, setData] = useState([
    { date: "2022-09-01", views: 100, article: "Article 1" },
    { date: "2023-09-01", views: 100, article: "Article 1" },
    { date: "2023-09-02", views: 150, article: "Article 2" },
    { date: "2023-09-02", views: 120, article: "Article 3" },
    { date: "2020-09-03", views: 200, article: "Article 4" },
  ]);

  const sortByDate = () => {
    const sorted = [...data].sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      if (dateA > dateB) return -1;
      if (dateA < dateB) return 1;
      // Same date → sort by views descending
      return b.views - a.views;
    });
    setData(sorted);
  };

  const sortByViews = () => {
    const sorted = [...data].sort((a, b) => {
      if (b.views !== a.views) {
        return b.views - a.views;
      }
      // Same views → sort by date descending
      return new Date(b.date) - new Date(a.date);
    });
    setData(sorted);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Date and Views Table</h1>

      <div style={{ marginBottom: "10px" }}>
        <button onClick={sortByDate}>Sort by Date</button>
        <button onClick={sortByViews} style={{ marginLeft: "10px" }}>
          Sort by Views
        </button>
      </div>

      <table border="1" cellPadding="10" cellSpacing="0">
        <thead>
          <tr>
            <th>Date</th>
            <th>Views</th>
            <th>Article</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => (
            <tr key={idx}>
              <td>{row.date}</td>
              <td>{row.views}</td>
              <td>{row.article}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
