import React, { useState } from 'react';
import axios from 'axios';

const CustomerForm = () => {
  const [name, setName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/customers', { name });
      setName('');
    } catch (error) {
      console.error('There was an error creating the customer!', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
    
      <input 
        type="text" 
        value={name} 
        onChange={(e) => setName(e.target.value)} 
        placeholder="Customer Name" 
        required 
      />
      <button type="submit">Add</button>
    </form>
  );
};

export default CustomerForm;
