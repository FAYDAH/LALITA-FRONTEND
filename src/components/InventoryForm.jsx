import React, { useState, useEffect } from 'react';
import './InventoryForm.css';

const InventoryForm = () => {
  const [date, setDate] = useState('');
  const [product, setProduct] = useState('');
  const [quantity, setQuantity] = useState('');
  const [perUnitCostPrice, setPerUnitCostPrice] = useState('');
  const [perUnitSellingPrice, setPerUnitSellingPrice] = useState('');
  const [totalCostPrice, setTotalCostPrice] = useState('');
  const [totalSellingPrice, setTotalSellingPrice] = useState('');
  const [profit, setProfit] = useState('');
  const [vat, setVat] = useState('');
  const [profitAfterTax, setProfitAfterTax] = useState('');
  const [pocketMoney, setPocketMoney] = useState('');
  const [runningCost, setRunningCost] = useState('');
  const [roi, setRoi] = useState('');

  const handleProductChange = (e) => {
    const selectedProduct = e.target.value;
    setProduct(selectedProduct);

    const perUnitCostPrices = {
      'Small White Mug': 1500,
      'Big White Mug': 2000,
      'Big Magic Mug': 3500,
      'Small Magic Mug': 2500,
      'Gold Coated Mug': 4000,
      'Silver Coated Mug': 4000,
      'Mason Mug': 4500
    };

    const perUnitSellingPrices = {
      'Small White Mug': 2500,
      'Big White Mug': 4000,
      'Big Magic Mug': 6000,
      'Small Magic Mug': 4500,
      'Gold Coated Mug': 5000,
      'Silver Coated Mug': 5000,
      'Mason Mug': 6500
    };

    const pucp = perUnitCostPrices[selectedProduct];
    const pusp = perUnitSellingPrices[selectedProduct];
    setPerUnitCostPrice(pucp);
    setPerUnitSellingPrice(pusp);
  };

  const handleQuantityChange = (e) => {
    const qty = e.target.value;
    setQuantity(qty);
    setTotalCostPrice(perUnitCostPrice * qty);
    setTotalSellingPrice(perUnitSellingPrice * qty);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const calculatedProfit = totalSellingPrice - totalCostPrice;
    setProfit(calculatedProfit);
    const calculatedVat = calculatedProfit * 0.075;
    setVat(calculatedVat);
    const calculatedProfitAfterTax = calculatedProfit - calculatedVat;
    setProfitAfterTax(calculatedProfitAfterTax);
    const calculatedPocketMoney = calculatedProfitAfterTax * 0.3; // Calculate pocket money as 30% of profit after tax
    setPocketMoney(calculatedPocketMoney);
    const calculatedRunningCost = 0.15 * (calculatedProfitAfterTax - calculatedPocketMoney); // Calculate running cost as 15% of (profit after tax - pocket money)
    setRunningCost(calculatedRunningCost);
    const calculatedRoi = calculatedProfitAfterTax - (calculatedPocketMoney + calculatedRunningCost); // Calculate ROI
    setRoi(calculatedRoi);
  };

  useEffect(() => {
    setTotalCostPrice(perUnitCostPrice * quantity);
    setTotalSellingPrice(perUnitSellingPrice * quantity);
  }, [perUnitCostPrice, perUnitSellingPrice, quantity]);

  useEffect(() => {
    const calculatedProfit = totalSellingPrice - totalCostPrice;
    setProfit(calculatedProfit);
    const calculatedVat = calculatedProfit * 0.075;
    setVat(calculatedVat);
  }, [totalSellingPrice, totalCostPrice]);

  useEffect(() => {
    const calculatedProfitAfterTax = profit - vat;
    setProfitAfterTax(calculatedProfitAfterTax);
    const calculatedPocketMoney = calculatedProfitAfterTax * 0.3;
    setPocketMoney(calculatedPocketMoney);
    const calculatedRunningCost = 0.15 * (calculatedProfitAfterTax - calculatedPocketMoney);
    setRunningCost(calculatedRunningCost);
    const calculatedRoi = calculatedProfitAfterTax - (calculatedPocketMoney + calculatedRunningCost);
    setRoi(calculatedRoi);
  }, [profit, vat]);

  return (
    <form onSubmit={handleSubmit}>
      <label>Date:</label>
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        required
      />
      <br />
      <label>Product:</label>
      <select
        value={product}
        onChange={handleProductChange}
        required
      >
        <option value="">Select a product</option>
        <option value="Small White Mug">Small White Mug</option>
        <option value="Big White Mug">Big White Mug</option>
        <option value="Big Magic Mug">Big Magic Mug</option>
        <option value="Small Magic Mug">Small Magic Mug</option>
        <option value="Gold Coated Mug">Gold Coated Mug</option>
        <option value="Silver Coated Mug">Silver Coated Mug</option>
        <option value="Mason Mug">Mason Mug</option>
      </select>
      <br />
      <div className="flex-row">
        <div className="flex-column">
          <label>Per Unit Cost Price:</label>
          <input
            type="text"
            value={perUnitCostPrice ? `₦${perUnitCostPrice.toLocaleString()}` : ''}
            readOnly
          />
        </div>
        <div className="flex-column">
          <label>Per Unit Selling Price:</label>
          <input
            type="text"
            value={perUnitSellingPrice ? `₦${perUnitSellingPrice.toLocaleString()}` : ''}
            readOnly
          />
        </div>
        <div className="flex-column">
          <label>Quantity:</label>
          <input
            type="number"
            value={quantity}
            onChange={handleQuantityChange}
            required
          />
        </div>
      </div>
      <br />
      <div className="flex-row">
        <div className="flex-column">
          <label>Total Cost Price:</label>
          <input
            type="text"
            value={totalCostPrice ? `₦${totalCostPrice.toLocaleString()}` : ''}
            readOnly
          />
        </div>
        <div className="flex-column">
          <label>Total Selling Price:</label>
          <input
            type="text"
            value={totalSellingPrice ? `₦${totalSellingPrice.toLocaleString()}` : ''}
            readOnly
          />
        </div>
      </div>
      <br />
      <div className="flex-row">
        <div className="flex-column">
          <label>Profit:</label>
          <input
            type="text"
            value={profit ? `₦${profit.toLocaleString()}` : ''}
            readOnly
          />
        </div>
        <div className="flex-column">
          <label>VAT (7.5% of Profit):</label>
          <input
            type="text"
            value={vat ? `₦${vat.toLocaleString()}` : ''}
            readOnly
          />
        </div>
        <div className="flex-column">
          <label>Profit after Tax:</label>
          <input
            type="text"
            value={profitAfterTax ? `₦${profitAfterTax.toLocaleString()}` : ''}
            readOnly
          />
        </div>
      </div>
      <br />
      <div className="flex-row">
        <div className="flex-column">
          <label>Pocket Money (30% of Profit after Tax):</label>
          <input
            type="text"
            value={pocketMoney ? `₦${pocketMoney.toLocaleString()}` : ''}
            readOnly
          />
        </div>
      </div>
      <br />
      <div className="flex-row">
        <div className="flex-column">
          <label>Running Cost (15% of Profit after Tax - Pocket Money):</label>
          <input
            type="text"
            value={runningCost ? `₦${runningCost.toLocaleString()}` : ''}
            readOnly
          />
        </div>
      </div>
      <br />
      <div className="flex-row">
        <div className="flex-column">
          <label>Return on Investment (ROI):</label>
          <input
            type="text"
            value={roi ? `₦${roi.toLocaleString()}` : ''}
            readOnly
          />
        </div>
      </div>
      <br />
      <button type="submit">Submit</button>
    </form>
  );
};

export default InventoryForm;
