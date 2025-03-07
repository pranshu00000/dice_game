import React, { useEffect, useState } from 'react';

const DiceLine = ({ result, rolling }) => {
  const [animationState, setAnimationState] = useState('idle');

  useEffect(() => {
    if (rolling) {
      setAnimationState('rolling');
    } else if (result !== null) {
      setAnimationState('result');
    }
  }, [rolling, result]);

  const renderDice = (value, index) => {
    const isWinning = value >= 4;
    const isResult = !rolling && result === value;
    
    return (
      <div 
        key={value}
        className={`w-16 h-16 flex items-center justify-center rounded-lg border-2 text-2xl font-bold transition-all duration-300
          ${isWinning ? 'border-green-500 text-green-400' : 'border-red-500 text-red-400'}
          ${isResult ? 'transform scale-125 bg-gray-700' : 'bg-gray-800'}
          ${animationState === 'rolling' ? 'animate-pulse' : ''}
        `}
      >
        {value}
      </div>
    );
  };

  return (
    <div className="flex justify-center space-x-4 my-6">
      {[1, 2, 3, 4, 5, 6].map(renderDice)}
    </div>
  );
};

export default DiceLine;