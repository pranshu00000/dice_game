// web3Integration.js
import { ethers } from 'ethers';
import React, { useState, useEffect } from 'react';

// Web3 Wallet Integration Component
const Web3Wallet = ({ setBalance }) => {
  const [walletAddress, setWalletAddress] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const [ethBalance, setEthBalance] = useState(0);

  useEffect(() => {
    // Check if wallet was previously connected
    const savedWallet = localStorage.getItem('connectedWallet');
    if (savedWallet) {
      connectWallet();
    }
  }, []);

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        // Request account access
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        
        if (accounts.length > 0) {
          setWalletAddress(accounts[0]);
          setIsConnected(true);
          localStorage.setItem('connectedWallet', accounts[0]);
          
          // Get ETH balance
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const balance = await provider.getBalance(accounts[0]);
          const ethBal = ethers.utils.formatEther(balance);
          setEthBalance(parseFloat(ethBal));
          
          // Convert to game credits (1 ETH = 1000 credits for this example)
          const gameCredits = Math.floor(parseFloat(ethBal) * 1000);
          setBalance(gameCredits);
        }
      } catch (error) {
        console.error('Error connecting wallet:', error);
      }
    } else {
      alert('Please install MetaMask or another Ethereum wallet to use this feature');
    }
  };

  const disconnectWallet = () => {
    setWalletAddress('');
    setIsConnected(false);
    setEthBalance(0);
    localStorage.removeItem('connectedWallet');
    // Reset to default balance
    setBalance(1000);
  };

  // Listen for account changes
  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', (accounts) => {
        if (accounts.length > 0) {
          setWalletAddress(accounts[0]);
          connectWallet(); // Update balance
        } else {
          disconnectWallet();
        }
      });
    }
  }, []);

  return (
    <div className="bg-gray-800 p-4 rounded-lg mb-4">
      <h2 className="text-xl font-bold mb-2">Wallet Integration</h2>
      
      {isConnected ? (
        <div>
          <div className="flex justify-between items-center mb-2">
            <div>
              <div className="text-sm text-gray-400">Connected Wallet:</div>
              <div className="font-mono text-sm truncate">{walletAddress}</div>
            </div>
            <button 
              onClick={disconnectWallet}
              className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-md text-sm"
            >
              Disconnect
            </button>
          </div>
          <div className="text-sm text-gray-400">Ethereum Balance:</div>
          <div className="font-bold">{ethBalance.toFixed(4)} ETH</div>
        </div>
      ) : (
        <button 
          onClick={connectWallet}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md w-full"
        >
          Connect Wallet
        </button>
      )}
    </div>
  );
};

export default Web3Wallet;

// <Web3Wallet setBalance={setBalance} />