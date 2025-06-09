import React, { useState } from "react";
import "../Styles/RecentTransactions.css";
import { MdFastfood, MdMovie, MdFlight } from "react-icons/md";


const RecentTransactions = ({ expenses, handleEdit, handleDelete }) => {
  const itemsPerPage = 3;
  const [page, setPage] = useState(1);

  const totalPages = Math.ceil(expenses.length / itemsPerPage);
  const startIndex = (page - 1) * itemsPerPage;
  const paginatedExpenses = expenses.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const nextPage = () => {
    if (page < totalPages) setPage(page + 1);
  };

  const prevPage = () => {
    if (page > 1) setPage(page - 1);
  };

  const categoryIcons = {
    Food: <MdFastfood className="icon-background" />,
    Entertainment: <MdMovie className="icon-background" />,
    Travel: <MdFlight className="icon-background" />,
  };


  return (
    <div>
      <ul className="expense-list">
        {paginatedExpenses.map((exp, index) => (
          <li key={startIndex + index} className="expense-item">
            <div className="expense-left">
              <div className="expense-title">
                {categoryIcons[exp.category]} {exp.title}
              </div>
              <div className="expense-date">{exp.date}</div>
            </div>
            <div className="expense-right">
              <div className="expense-price">₹{exp.price}</div>
              <div className="expense-actions">
                <button onClick={() => handleEdit(startIndex + index)}>
                  ✏️
                </button>
                <button onClick={() => handleDelete(startIndex + index)}>
                  🗑️
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="pagination">
          <button onClick={prevPage} disabled={page === 1}>
            ←
          </button>
          <span className="page-number">{page}</span>
          <button onClick={nextPage} disabled={page === totalPages}>
            →
          </button>
        </div>
      )}
    </div>
  );
};

export default RecentTransactions;
