import React, { useState } from 'react';

const ProvablyFairInfo = ({ 
  clientSeed, 
  setClientSeed, 
  serverSeedHash, 
  previousServerSeed,
  previousServerSeedHash,
  nonce 
}) => {
  const [showDetails, setShowDetails] = useState(false);
  
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Provably Fair System</h2>
      
      <button 
        onClick={() => setShowDetails(!showDetails)}
        className="text-blue-400 mb-4"
      >
        {showDetails ? 'Hide Details' : 'Show Details'}
      </button>
      
      {showDetails && (
        <div className="text-sm text-gray-300 mb-4">
          <p>Our provably fair system uses SHA-256 hashing to ensure that neither the player nor the house can predict or manipulate the outcome of any roll.</p>
          <ol className="list-decimal list-inside mt-2 space-y-1">
            <li>The server generates a random seed and shares only its hash with you.</li>
            <li>You provide your own client seed that you can change at any time.</li>
            <li>The outcome is determined by combining both seeds with a nonce counter.</li>
            <li>After each roll, you can verify the previous results using the revealed server seed.</li>
          </ol>
        </div>
      )}
      
      <div className="space-y-3">
        <div>
          <label className="block text-gray-400 text-sm mb-1">Your Client Seed:</label>
          <div className="flex">
            <input
              type="text"
              value={clientSeed}
              onChange={(e) => setClientSeed(e.target.value)}
              className="flex-grow bg-gray-700 text-white px-3 py-2 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
            <button
              onClick={() => setClientSeed(Math.random().toString(36).substring(2, 15))}
              className="bg-gray-600 px-3 py-2 rounded-r-md text-sm"
            >
              New
            </button>
          </div>
        </div>
        
        <div>
          <label className="block text-gray-400 text-sm mb-1">Current Server Seed Hash:</label>
          <div className="bg-gray-700 px-3 py-2 rounded-md text-sm font-mono break-all">
            {serverSeedHash || 'Loading...'}
          </div>
        </div>
        
        <div>
          <label className="block text-gray-400 text-sm mb-1">Nonce:</label>
          <div className="bg-gray-700 px-3 py-2 rounded-md text-sm">
            {nonce}
          </div>
        </div>
        
        {previousServerSeed && (
          <div>
            <label className="block text-gray-400 text-sm mb-1">Previous Server Seed:</label>
            <div className="bg-gray-700 px-3 py-2 rounded-md text-sm font-mono break-all">
              {previousServerSeed}
            </div>
          </div>
        )}
        
        {previousServerSeedHash && (
          <div>
            <label className="block text-gray-400 text-sm mb-1">Previous Server Seed Hash:</label>
            <div className="bg-gray-700 px-3 py-2 rounded-md text-sm font-mono break-all">
              {previousServerSeedHash}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProvablyFairInfo;