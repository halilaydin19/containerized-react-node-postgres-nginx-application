import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {useMessageStore} from './store'
import { useNavigate } from 'react-router-dom';



function NextPage() {
  const [recordCount, setRecordCount] = useState(0);
  const message = useMessageStore.getState().message;
  const navigate = useNavigate();
  console.log(message)


  const navigatefunc = () => {
    navigate("/")
  };


  useEffect(() => {
    const fetchRecordCount = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/form/values');
        setRecordCount(response.data.length);
      } catch (error) {
        console.error('Error fetching record count:', error);
      }
    };

    fetchRecordCount();

  }, []);



  return (
    <div>
      <div>
        {message === 'User already exists.' ? (
          <p>User already exists.</p>

        ) : (

          <p>Total Number of Records: {recordCount}</p>
        )}
      </div>
      <div>
        <button type="submit" color="primary" className="px-4" onClick={() => navigatefunc()}>
          Login
        </button>
      </div>
    </div>


  );
}

export default NextPage;
