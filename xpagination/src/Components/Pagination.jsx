import React, { useState, useEffect, useMemo } from 'react';
import styles from "./Pagination.module.css";

const Pagination = () => {
  const perPage = 10;
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  
  const fetchData = async () => {
    try {
      const response = await fetch(
        'https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json'
      );

      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }

      const result = await response.json();
      setData(result);
    } catch (error) {
      alert('Failed to fetch data');
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const nextPage = () => {
    if(currentPage < Math.ceil(data.length / perPage)){
      setCurrentPage(currentPage + 1);
    }
      

  };

  const prevPage = () => {
    if(currentPage > 1){
      setCurrentPage(currentPage - 1);
    }
      
  };

  const startIndex = (currentPage - 1) * perPage;
  const endIndex = startIndex + perPage;
  const currentData = useMemo(() => {
    return data.slice(startIndex, endIndex);
  }, [data, startIndex, endIndex]);

  return (
    <div className={styles.container}>
      <h1>Employee Data Table</h1>
        <table className={styles.tableContainer}>
          {/* Table Header */}
          <thead className={styles.tableHead}>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
            </tr>
          </thead>
          {/* Table Body */}
          <tbody className={styles.tableBody}>
            {currentData.map((employee) => (
              <tr key={employee.id}>
                <td>{employee.id}</td>
                <td>{employee.name}</td>
                <td>{employee.email}</td>
                <td>{employee.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      {/* Pagination Buttons */}
      <div>
        <button className={styles.prevButton} onClick={prevPage}>
          Previous
        </button>
        <span className={styles.pageNumber}>{currentPage}</span>
        <button className={styles.nextButton} onClick={nextPage} disabled={currentPage === Math.ceil(data.length / perPage)}>
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination;
