import React from 'react';

const BetForm = ({ betAmount, setBetAmount, onRoll, disabled }) => {
  return (
    <div className="flex flex-col space-y-4">
      <div className="flex flex-col space-y-2">
        <label htmlFor="betAmount" className="text-gray-300">Bet Amount:</label>
        <div className="flex">
          <input
            type="number"
            id="betAmount"
            value={betAmount}
            onChange={(e) => setBetAmount(Math.max(1, parseInt(e.target.value) || 0))}
            className="w-full bg-gray-700 text-white px-3 py-2 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            min="1"
          />
          <button
            onClick={() => setBetAmount(Math.max(1, betAmount / 2))}
            className="bg-gray-600 px-3 py-2 font-bold"
            type="button"
          >
            ½
          </button>
          <button
            onClick={() => setBetAmount(betAmount * 2)}
            className="bg-gray-600 px-3 py-2 font-bold rounded-r-md"
            type="button"
          >
            2×
          </button>
        </div>
      </div>
      
      <button
        onClick={onRoll}
        disabled={disabled}
        className={`py-3 px-6 rounded-md text-xl font-bold 
          ${disabled ? 'bg-gray-600 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
      >
        {disabled ? 'Rolling...' : 'Roll Dice'}
      </button>
    </div>
  );
};

export default BetForm;