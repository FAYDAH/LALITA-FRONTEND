import React from 'react';
import CustomerForm from '../components/CustomerForm';
import InventoryForm from '../components/InventoryForm';

const Home = () => {
  return (
    <div className="container">
      <h1 className="script-font">My Lalita</h1>
      <CustomerForm />
      <InventoryForm />
    </div>
  );
};

export default Home;
