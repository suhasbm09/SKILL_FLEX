import React, { createContext, useState } from 'react';

export const WalletContext = createContext();

export const WalletProvider = ({ children }) => {
  const [walletAddress, setWalletAddress] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  const connectWallet = async () => {
    if (window.solana?.isPhantom) {
      try {
        const res = await window.solana.connect();
        const address = res.publicKey.toString();
        setWalletAddress(address);
        setIsConnected(true);
        console.log('✅ Wallet connected:', address);
      } catch (err) {
        console.error('❌ Wallet connection failed:', err);
      }
    } else {
      alert('⚠️ Phantom Wallet not found. Please install it from https://phantom.app/');
    }
  };

  const disconnectWallet = async () => {
    if (window.solana?.isPhantom) {
      try {
        await window.solana.disconnect();
        setWalletAddress(null);
        setIsConnected(false);
        console.log('🔌 Wallet disconnected.');
      } catch (err) {
        console.error('❌ Wallet disconnection failed:', err);
      }
    }
  };

  return (
    <WalletContext.Provider
      value={{
        walletAddress,
        isConnected,
        connectWallet,
        disconnectWallet,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};
