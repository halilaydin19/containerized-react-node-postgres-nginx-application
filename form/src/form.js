import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {useMessageStore} from './store';

function Form() {
  const [inputs, setInputs] = useState({
    firstName: '',
    lastName: ''
  });
  const navigate = useNavigate();
  const [message, setMessage] = useState('');

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setInputs(prev => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/form', {
        values: inputs 
      });
      console.log(response.data.message)

 
      setInputs({ firstName: '', lastName: '' });
      useMessageStore.setState({message: response.data.message});


      navigate('/NextPage');
    } catch (error) {
      if (error.response) {
        setMessage('Error: ' + error.response.data.message); 
      } else {
        setMessage('An error occurred. Please try again later.');
      }
    }



  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          First Name:
          <input
            type="text"
            name="firstName"
            value={inputs.firstName}
            onChange={handleInputChange}
            required
          />
        </label>
        <label>
          Last Name:
          <input
            type="text"
            name="lastName"
            value={inputs.lastName}
            onChange={handleInputChange}
            required
          />
        </label>
        <button type="submit" class="btn btn-primary">SUBMIT</button>
      </form>
    </div>
  );
}

export default Form;