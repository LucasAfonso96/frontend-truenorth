import React, { useState, useEffect, useCallback } from 'react';
import './UserRecords.css'; 
import Swal from 'sweetalert2';
import config from '../../config';

const UserRecords = ({ isLoggedIn }) => {
  const [records, setRecords] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortField, setSortField] = useState('id');
  const [deleteRecordId, setDeleteRecordId] = useState(null);


  const fetchUserRecords = useCallback(async () => {
    const token = localStorage.getItem('authToken');
    const url = `http://localhost:8000/api/user-records/?page=${currentPage}&per_page=${10}&search=${searchQuery}&sort_by=${sortField}`;
    const response = await fetch(url, {
      headers: {
        Authorization: token
      }
    });

    if (response.ok) {
      const data = await response.json();
      setRecords(data.records);
      setTotalRecords(data.totalRecords);
    }
  },  [currentPage, searchQuery, sortField, deleteRecordId]);

  useEffect(() => {
    fetchUserRecords();
  }, [fetchUserRecords]);


  const handleDeleteRecord = async (recordId) => {
    const token = localStorage.getItem('authToken');
    const url = `${config.apiUrl}/api/user-records/`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token
      },
      body: JSON.stringify({ record_id: recordId })
    });

    if (response.ok) {
      setDeleteRecordId(recordId);
      Swal.fire({
        icon: 'success',
        title: 'Delete Successful',
        text: `You have successfully deleted the record:${recordId}`,
        showConfirmButton: true,
      });
      
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1); 
    fetchUserRecords();
  };

  return (
    <div className="container mt-4">
      {isLoggedIn ? (
        <>
          <div className="row mb-3">
            <div className="col">
              <strong>Current Page:</strong> {currentPage} | <strong>Per Page:</strong> 10 |{' '}
              <strong>Total Records:</strong> {totalRecords}
            </div>
            <div className="col d-flex justify-content-end">
              <button
                className="btn btn-primary me-2"
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Previous Page
              </button>
              <button
                className="btn btn-primary"
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={currentPage === Math.ceil(totalRecords / 10)}
              >
                Next Page
              </button>
            </div>
          </div>

          <div className="row mb-3">
            <div className="col">

            </div>
            <form onSubmit={handleSearch}>
            <div>
              <span>Search by Id:</span><input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
              <button type="submit">Search</button>
            </div>
          </form>
          </div>

          <table className="table">
            <thead>
           
              <tr>
                <th> 
                  <button className="btn btn-link" onClick={() => setSortField('id')}>
                  ID
                  </button>
                </th>
                
                <th>
                  <button className="btn btn-link" onClick={() => setSortField('amount')}>
                    Amount
                  </button>
                </th>
                <th>
                  <button className="btn btn-link" onClick={() => setSortField('type')}>
                    Type
                  </button>
                </th>
                <th>
                  <button className="btn btn-link" onClick={() => setSortField('cost')}>
                    Cost
                  </button>
                </th>
                <th>
                  <button className="btn btn-link" onClick={() => setSortField('operation_response')}>
                    Result
                  </button>
                </th>
                <th>
                  <button className="btn btn-link" onClick={() => setSortField('date')}>
                    Date
                  </button>
                </th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {records.map((record, index) => (
                <tr key={record.id} className={index % 2 === 0 ? 'table-row even' : 'table-row odd'}>
                  <td>{record.id}</td>
                  <td>{record.amount}</td>
                  <td>{record.operation.type}</td>
                  <td>{record.operation.cost}</td>
                  <td>{record.operation_response}</td>
                  <td>{record.date}</td>
                  <td>
                    <button className="btn btn-danger" onClick={() => handleDeleteRecord(record.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      ) : (
        <>
        <br></br>
          <h1>Must do the Login to see the User Records</h1>
        </>
      )}
    </div>
  );
};

export default UserRecords;
