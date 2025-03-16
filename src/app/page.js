// src/app/page.js
import { useState, useEffect } from "react";
import Button from "../components/ui/Button";
import Card, { CardHeader, CardTitle, CardContent } from "../components/ui/Card";
import ProgressBar from "../components/ui/ProgressBar";
import useWallet from "../hooks/useWallet";
import useContract from "../hooks/useContract";
import useCampaigns from "../hooks/useCampaigns";
import { ethers } from "ethers";

export default function Home() {
  const { account, signer, connectWallet, disconnectWallet, isConnecting, error: walletError } = useWallet();
  const { contract, error: contractError } = useContract(signer);
  const { campaigns, loading, error: campaignsError, donateToCampaign } = useCampaigns(contract);
  
  const [donationAmount, setDonationAmount] = useState("");
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [txStatus, setTxStatus] = useState({ status: null, message: null });

  // Set the selected campaign when campaigns are loaded
  useEffect(() => {
    if (campaigns.length > 0 && !selectedCampaign) {
      setSelectedCampaign(campaigns[0]);
    }
  }, [campaigns]);

  const handleDonate = async () => {
    if (!account) {
      alert("Please connect your wallet first!");
      return;
    }
    
    if (!selectedCampaign) {
      alert("No campaign selected!");
      return;
    }
    
    if (!donationAmount || isNaN(donationAmount) || donationAmount <= 0) {
      alert("Please enter a valid donation amount!");
      return;
    }

    setTxStatus({ status: "pending", message: "Processing your donation..." });
    
    try {
      const txHash = await donateToCampaign(selectedCampaign.id, donationAmount);
      setDonationAmount("");
      setTxStatus({ 
        status: "success", 
        message: `Donation successful! Transaction hash: ${txHash.substring(0, 10)}...` 
      });
      
      // Clear status after 5 seconds
      setTimeout(() => setTxStatus({ status: null, message: null }), 5000);
    } catch (error) {
      console.error("Donation failed:", error);
      setTxStatus({ 
        status: "error", 
        message: `Donation failed: ${error.message || "Unknown error"}` 
      });
    }
  };

  // Status alert component
  const StatusAlert = () => {
    if (!txStatus.status) return null;
    
    const bgColor = txStatus.status === "success" ? "bg-green-800" : 
                    txStatus.status === "error" ? "bg-red-800" : "bg-blue-800";
    
    return (
      <div className={`${bgColor} text-white p-3 rounded-md mb-4 flex justify-between items-center`}>
        <span>{txStatus.message}</span>
        <button onClick={() => setTxStatus({ status: null, message: null })} className="text-white">
          ×
        </button>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-900 bg-gradient-to-b from-gray-900 to-gray-800 flex flex-col items-center py-8">
      <div className="max-w-4xl w-full px-4">
        <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 mb-2 text-center">
          Emergency Fund Platform
        </h1>
        <p className="text-gray-400 text-center mb-8">Peer-to-peer financial support for emergencies</p>
        
        {/* Status alerts */}
        <StatusAlert />
        
        {/* Wallet Connection */}
        <div className="text-center mb-8">
          {!account ? (
            <Button 
              onClick={connectWallet} 
              disabled={isConnecting}
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
            >
              {isConnecting ? "Connecting..." : "Connect Wallet"}
            </Button>
          ) : (
            <div className="flex items-center justify-center gap-4">
              <div className="bg-gray-800 px-4 py-2 rounded-lg border border-gray-700">
                <span className="text-gray-400 mr-2">Connected:</span>
                <span className="text-cyan-400">{account.slice(0, 6)}...{account.slice(-4)}</span>
              </div>
              <Button 
                onClick={disconnectWallet} 
                variant="secondary"
                className="border border-gray-700"
              >
                Disconnect
              </Button>
            </div>
          )}
          {walletError && <p className="text-red-500 mt-2">{walletError}</p>}
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
            <p className="text-gray-400 mt-4">Loading campaigns...</p>
            </div>
        ) : campaignsError ? (
          <div className="text-center py-12">
            <p className="text-red-500">{campaignsError}</p>
            <Button 
              onClick={() => window.location.reload()} 
              className="mt-4"
            >
              Retry
            </Button>
          </div>
        ) : campaigns.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-400">No campaigns found.</p>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Campaign Selection */}
            {campaigns.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-800">
                {campaigns.map((campaign) => (
                  <button
                    key={campaign.id}
                    onClick={() => setSelectedCampaign(campaign)}
                    className={`px-4 py-2 whitespace-nowrap rounded-lg transition ${
                      selectedCampaign?.id === campaign.id 
                        ? "bg-blue-600 text-white" 
                        : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                    }`}
                  >
                    {campaign.title}
                  </button>
                ))}
              </div>
            )}

            {/* Selected Campaign Card */}
            {selectedCampaign && (
              <Card className="border-gray-700 bg-gradient-to-b from-gray-800 to-gray-850 shadow-xl">
                <CardHeader>
                  <CardTitle className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
                    {selectedCampaign.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 mb-4">{selectedCampaign.description}</p>
                  
                  <div className="mb-4">
                    <div className="flex justify-between text-sm text-gray-400 mb-1">
                      <span>Progress</span>
                      <span>{Math.round((selectedCampaign.raised / selectedCampaign.goal) * 100)}%</span>
                    </div>
                    <ProgressBar 
                      progress={selectedCampaign.raised} 
                      max={selectedCampaign.goal} 
                    />
                    <div className="flex justify-between text-sm text-gray-400 mt-2">
                      <span>{selectedCampaign.raised.toFixed(2)} ETH raised</span>
                      <span>{selectedCampaign.goal.toFixed(2)} ETH goal</span>
                    </div>
                  </div>
                  
                  <div className="bg-gray-750 rounded-lg p-3 mb-4 border border-gray-700">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Recipient:</span>
                      <span className="text-cyan-400 font-mono">
                        {selectedCampaign.receiver.slice(0, 6)}...{selectedCampaign.receiver.slice(-4)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-gray-400">Campaign ID:</span>
                      <span className="text-cyan-400 font-mono">#{selectedCampaign.id}</span>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <label className="block text-gray-400 mb-2">Donation Amount (ETH)</label>
                    <div className="flex gap-2">
                      <div className="relative flex-grow">
                        <input
                          type="number"
                          value={donationAmount}
                          onChange={(e) => setDonationAmount(e.target.value)}
                          placeholder="0.00"
                          className="w-full px-3 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          step="0.01"
                        />
                        <span className="absolute right-3 top-2 text-gray-400">ETH</span>
                      </div>
                      <Button 
                        onClick={handleDonate} 
                        disabled={!account || !donationAmount}
                        className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Donate
                      </Button>
                    </div>
                    {!account && (
                      <p className="text-amber-500 text-sm mt-2">
                        Connect your wallet to donate
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Call to Action */}
            <div className="text-center py-8">
              <h2 className="text-2xl font-bold text-white mb-4">Need help with an emergency?</h2>
              <Button 
                variant="primary" 
                className="text-lg px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                onClick={() => alert("Create campaign functionality coming soon!")}
              >
                Create a Campaign
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}