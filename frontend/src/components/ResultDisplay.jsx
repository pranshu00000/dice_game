import React from 'react';

const ResultDisplay = ({ diceResult }) => {
  if (diceResult === null) {
    return (
      <div className="mt-6 text-center text-gray-400">
        Place your bet and roll the dice!
      </div>
    );
  }
  
  const isWin = diceResult >= 4;
  
  return (
    <div className="mt-6 text-center">
      <div className={`text-2xl font-bold ${isWin ? 'text-green-400' : 'text-red-400'}`}>
        {isWin ? 'You Win!' : 'You Lose!'}
      </div>
      <div className="text-gray-300 mt-2">
        You rolled a {diceResult}. {isWin ? 'Numbers 4-6 win!' : 'Numbers 1-3 lose.'}
      </div>
    </div>
  );
};

export default ResultDisplay;