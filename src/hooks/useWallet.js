// src/hooks/useWallet.js
import { useState, useEffect } from "react";
import { ethers } from "ethers";

export default function useWallet() {
  const [account, setAccount] = useState(null);
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [chainId, setChainId] = useState(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState(null);

  // Initialize provider from window.ethereum
  useEffect(() => {
    if (window.ethereum) {
      const ethProvider = new ethers.providers.Web3Provider(window.ethereum);
      setProvider(ethProvider);
      
      // Listen for account changes
      window.ethereum.on("accountsChanged", (accounts) => {
        if (accounts.length > 0) {
          setAccount(accounts[0]);
        } else {
          setAccount(null);
        }
      });
      
      // Listen for chain changes
      window.ethereum.on("chainChanged", (chainIdHex) => {
        setChainId(parseInt(chainIdHex, 16));
        // Refresh provider
        const updatedProvider = new ethers.providers.Web3Provider(window.ethereum);
        setProvider(updatedProvider);
        if (account) {
          setSigner(updatedProvider.getSigner());
        }
      });
      
      // Check if already connected
      ethProvider.listAccounts().then(accounts => {
        if (accounts.length > 0) {
          setAccount(accounts[0]);
          setSigner(ethProvider.getSigner());
          ethProvider.getNetwork().then(network => {
            setChainId(network.chainId);
          });
        }
      });
    }
    
    return () => {
      if (window.ethereum) {
        window.ethereum.removeAllListeners("accountsChanged");
        window.ethereum.removeAllListeners("chainChanged");
      }
    };
  }, []);

  const connectWallet = async () => {
    if (!window.ethereum) {
      setError("No Ethereum wallet found. Please install MetaMask.");
      return null;
    }
    
    setIsConnecting(true);
    setError(null);
    
    try {
      const accounts = await window.ethereum.request({ 
        method: "eth_requestAccounts" 
      });
      
      if (accounts.length > 0) {
        setAccount(accounts[0]);
        const ethProvider = new ethers.providers.Web3Provider(window.ethereum);
        setProvider(ethProvider);
        setSigner(ethProvider.getSigner());
        
        const network = await ethProvider.getNetwork();
        setChainId(network.chainId);
        
        return accounts[0];
      }
      return null;
    } catch (error) {
      console.error("Wallet connection failed:", error);
      setError(error.message || "Failed to connect wallet");
      return null;
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnectWallet = () => {
    setAccount(null);
    setSigner(null);
  };

  return { 
    account, 
    provider,
    signer,
    chainId,
    isConnecting,
    error,
    connectWallet,
    disconnectWallet
  };
}