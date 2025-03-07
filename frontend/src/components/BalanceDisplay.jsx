// components/BalanceDisplay.js
import React from 'react';

const BalanceDisplay = ({ balance }) => {
  // Add a default value or handle null/undefined
  const formattedBalance = balance !== null && balance !== undefined 
    ? balance.toLocaleString()
    : '0';

  return (
    <div className="text-center mb-4">
      <h2 className="text-xl text-gray-400">Your Balance</h2>
      <div className="text-3xl font-bold">${formattedBalance}</div>
    </div>
  );
};

export default BalanceDisplay;