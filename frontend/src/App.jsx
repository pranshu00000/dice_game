// App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DiceLine from './components/DiceLine';
import BetForm from './components/BetForm';
import BalanceDisplay from './components/BalanceDisplay';
import ResultDisplay from './components/ResultDisplay';
import ProvablyFairInfo from './components/ProvablyFairInfo';
import Web3Wallet from './components/Web3Wallet';

function App() {
  const [balance, setBalance] = useState(1000);
  const [betAmount, setBetAmount] = useState(10);
  const [diceResult, setDiceResult] = useState(null);
  const [rolling, setRolling] = useState(false);
  const [serverSeed, setServerSeed] = useState('');
  const [clientSeed, setClientSeed] = useState('');
  const [previousServerSeed, setPreviousServerSeed] = useState('');
  const [previousServerSeedHash, setPreviousServerSeedHash] = useState('');
  const [nonce, setNonce] = useState(0);
  const [rollHistory, setRollHistory] = useState([]);

  useEffect(() => {
    // Load balance from localStorage
    try {
      const savedBalance = localStorage.getItem('diceGameBalance');
      if (savedBalance) {
        const parsedBalance = parseInt(savedBalance);
        if (!isNaN(parsedBalance)) {
          setBalance(parsedBalance);
        }
      }
    } catch (error) {
      console.error('Error loading balance from localStorage:', error);
    }
    
    // Generate initial client seed
    const initialClientSeed = Math.random().toString(36).substring(2, 15);
    setClientSeed(initialClientSeed);
    
    // Get server seed hash from backend
    fetchNewServerSeedHash();
  }, []);

  useEffect(() => {
  if (balance !== null && balance !== undefined) {
    localStorage.setItem('diceGameBalance', balance.toString());
  }
  }, [balance]);

  const fetchNewServerSeedHash = async () => {
    try {
      const response = await axios.get('https://dice-game-7mwa.onrender.com/api/new-seed');
      setServerSeed('');
      setPreviousServerSeed(response.data.previousServerSeed || '');
      setPreviousServerSeedHash(response.data.previousServerSeedHash || '');
      setServerSeed(response.data.serverSeedHash);
    } catch (error) {
      console.error('Error fetching server seed hash:', error);
    }
  };

  const handleRollDice = async () => {
    if (betAmount < 0 || betAmount > balance) {
      alert('Invalid bet amount!');
      return;
    }

    setRolling(true);
    
    try {
      const response = await axios.post('https://dice-game-7mwa.onrender.com/api/roll-dice', {
        betAmount,
        clientSeed,
        nonce,
        currentBalance: balance 
      });

      const { roll, won, newBalance, serverSeed: revealedServerSeed } = response.data;
      
      // Update state with roll result
      setDiceResult(roll);
      setBalance(newBalance);
      setNonce(prevNonce => prevNonce + 1);
      
      // If server reveals the seed, update it and fetch new hash
      if (revealedServerSeed) {
        setPreviousServerSeed(revealedServerSeed);
        fetchNewServerSeedHash();
      }
      
      // Add to roll history
      setRollHistory(prev => [
        { 
          roll, 
          betAmount, 
          won, 
          time: new Date().toLocaleTimeString() 
        }, 
        ...prev
      ].slice(0, 10));
      
    } catch (error) {
      console.error('Error rolling dice:', error);
      alert('Error rolling dice. Please try again.');
    } finally {
      setRolling(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">Provably Fair Dice Game</h1>
        
            <Web3Wallet setBalance={setBalance} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <BalanceDisplay balance={balance} />
            <div className="my-8">
              <DiceLine result={diceResult} rolling={rolling} />
            </div>
            
            <BetForm 
              betAmount={betAmount} 
              setBetAmount={setBetAmount} 
              onRoll={handleRollDice} 
              disabled={rolling} 
            />
            
            <ResultDisplay diceResult={diceResult} />
          </div>
          
          <div className="space-y-6">
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
              <ProvablyFairInfo 
                clientSeed={clientSeed}
                setClientSeed={setClientSeed}
                serverSeedHash={serverSeed}
                previousServerSeed={previousServerSeed}
                previousServerSeedHash={previousServerSeedHash}
                nonce={nonce}
              />
            </div>
            
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
              <h2 className="text-xl font-bold mb-4">Roll History</h2>
              <div className="max-h-64 overflow-y-auto">
                {rollHistory.length === 0 ? (
                  <p className="text-gray-400">No rolls yet</p>
                ) : (
                  <ul className="space-y-2">
                    {rollHistory.map((roll, index) => (
                      <li key={index} className="flex justify-between border-b border-gray-700 pb-2">
                        <span className="flex items-center">
                          <span className={`inline-block w-8 h-8 rounded-full text-center leading-8 mr-3 
                            ${roll.won ? 'bg-green-600' : 'bg-red-600'}`}>
                            {roll.roll}
                          </span>
                          <span>{roll.time}</span>
                        </span>
                        <span className={roll.won ? 'text-green-400' : 'text-red-400'}>
                          {roll.won ? `+$${roll.betAmount}` : `-$${roll.betAmount}`}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;