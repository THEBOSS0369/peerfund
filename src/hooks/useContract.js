// src/hooks/useContract.js
import { useState, useEffect } from "react";
import { ethers } from "ethers";

// ABI for your emergency fund contract
// This is a simplified example - replace with your actual contract ABI
const EMERGENCY_FUND_ABI = [
  // Read functions
  "function getCampaign(uint256 campaignId) view returns (address creator, string memory title, string memory description, uint256 goal, uint256 raised, address receiver, bool isActive)",
  "function getCampaignCount() view returns (uint256)",
  
  // Write functions
  "function createCampaign(string memory title, string memory description, uint256 goal, address receiver) returns (uint256)",
  "function donate(uint256 campaignId) payable",
  "function withdrawFunds(uint256 campaignId) external",
  
  // Events
  "event CampaignCreated(uint256 indexed campaignId, address indexed creator, uint256 goal)",
  "event DonationReceived(uint256 indexed campaignId, address indexed donor, uint256 amount)",
  "event FundsWithdrawn(uint256 indexed campaignId, address indexed receiver, uint256 amount)"
];

// Update this with your deployed contract address
const CONTRACT_ADDRESS = "0xYourContractAddressHere";

export default function useContract(signerOrProvider) {
  const [contract, setContract] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!signerOrProvider) {
      setContract(null);
      setIsLoading(false);
      return;
    }

    try {
      const emergencyFundContract = new ethers.Contract(
        CONTRACT_ADDRESS,
        EMERGENCY_FUND_ABI,
        signerOrProvider
      );
      
      setContract(emergencyFundContract);
      setError(null);
    } catch (err) {
      console.error("Error initializing contract:", err);
      setError("Failed to connect to the contract");
      setContract(null);
    } finally {
      setIsLoading(false);
    }
  }, [signerOrProvider]);

  return { contract, isLoading, error };
}