import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';



function NextPage() {
  const [recordCount, setRecordCount] = useState(0);
  const navigate = useNavigate();
  


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
        

          <p>Total Number of Records: {recordCount}</p>
        
      </div>
      <div>
        <button type="submit" color="primary" className="px-4" onClick={() => navigatefunc()}>
          User List
        </button>
      </div>
    </div>


  );
}

export default NextPage;
