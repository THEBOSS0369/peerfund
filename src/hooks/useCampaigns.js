// src/hooks/useCampaigns.js
import { useState, useEffect } from "react";
import { ethers } from "ethers";

export default function useCampaigns(contract) {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCampaigns = async () => {
    if (!contract) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const campaignCount = await contract.getCampaignCount();
      const campaignCountNumber = campaignCount.toNumber();
      
      const campaignPromises = [];
      for (let i = 1; i <= campaignCountNumber; i++) {
        campaignPromises.push(contract.getCampaign(i));
      }
      
      const campaignData = await Promise.all(campaignPromises);
      
      const formattedCampaigns = campaignData.map((campaign, index) => {
        return {
          id: index + 1,
          creator: campaign.creator,
          title: campaign.title,
          description: campaign.description,
          goal: parseFloat(ethers.utils.formatEther(campaign.goal)),
          raised: parseFloat(ethers.utils.formatEther(campaign.raised)),
          receiver: campaign.receiver,
          isActive: campaign.isActive
        };
      });
      
      setCampaigns(formattedCampaigns);
    } catch (err) {
      console.error("Error fetching campaigns:", err);
      setError("Failed to load campaigns");
    } finally {
      setLoading(false);
    }
  };

  const createCampaign = async (title, description, goalEth, receiver) => {
    if (!contract) throw new Error("Contract not initialized");
    
    const goalWei = ethers.utils.parseEther(goalEth.toString());
    
    try {
      const tx = await contract.createCampaign(title, description, goalWei, receiver);
      await tx.wait();
      
      // Refresh campaigns after creation
      await fetchCampaigns();
      
      return tx.hash;
    } catch (err) {
      console.error("Error creating campaign:", err);
      throw new Error(err.message || "Failed to create campaign");
    }
  };

  const donateToCampaign = async (campaignId, amountEth) => {
    if (!contract) throw new Error("Contract not initialized");
    
    const amountWei = ethers.utils.parseEther(amountEth.toString());
    
    try {
      const tx = await contract.donate(campaignId, { value: amountWei });
      await tx.wait();
      
      // Update the specific campaign
      const updatedCampaign = await contract.getCampaign(campaignId);
      
      setCampaigns(prevCampaigns => {
        return prevCampaigns.map(campaign => {
          if (campaign.id === campaignId) {
            return {
              ...campaign,
              raised: parseFloat(ethers.utils.formatEther(updatedCampaign.raised))
            };
          }
          return campaign;
        });
      });
      
      return tx.hash;
    } catch (err) {
      console.error("Error donating to campaign:", err);
      throw new Error(err.message || "Failed to donate");
    }
  };

  // Initial fetch when contract is available
  useEffect(() => {
    if (contract) {
      fetchCampaigns();
    }
  }, [contract]);

  return {
    campaigns,
    loading,
    error,
    fetchCampaigns,
    createCampaign,
    donateToCampaign
  };
}