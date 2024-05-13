import React, { useState, useEffect } from 'react';
import axios from 'axios';
import GridTable from '@nadavshaar/react-grid-table';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function UserList() {
  const [users, setUsers] = useState([{}]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  

  const navigate = useNavigate();
  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get('http://localhost:8000/api/form/values');
        setUsers(response.data);
      } catch (err) {
        setError('Failed to fetch users. Please try again later.');
        console.error('Error fetching users:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = async (data) => {
    setLoading(true);
    setError(null);
    try {
      const responses = await axios.post('http://localhost:8000/api/form/delete', {
        values: data
      });
      const response = await axios.get('http://localhost:8000/api/form/values');
      setUsers(response.data);
      navigate('/NextPage');
    } catch (err) {
      setError('Failed to delete user. Please try again later.');
      console.error('Error deleting user:', err);
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      id: 1,
      field: 'firstname',
      label: 'Username',
    },
    {
      id: 2,
      field: 'lastname',
      label: 'User Last Name',
    },
    {
      id: 3,
      field: 'delete',
      label: 'Delete',
      cellRenderer: ({
        rowIndex
      
      }) => (
        
        <Button onClick={() => handleDelete(users[rowIndex-1].user_id)} variant="contained">
          X
        </Button>
      ),
    },
  ];

  return (
    <div>
      <h1>User List</h1>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <>
          <GridTable columns={columns} rows={users} />
        </>
      )}
    </div>
  );
}

export default UserList;