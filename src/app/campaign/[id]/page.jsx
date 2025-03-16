// src/app/campaign/[id]/page.js
"use client";
import { useState } from "react";
import { useParams } from "next/navigation";
import Button from "../../../components/ui/Button";
import Card, {
  CardHeader,
  CardTitle,
  CardContent,
} from "../../../components/ui/Card";
import ProgressBar from "../../../components/ui/ProgressBar";
import useWallet from "../../../hooks/useWallet";

export default function CampaignPage() {
  const { account, connectWallet } = useWallet();
  const { id } = useParams(); // Get the campaign ID from the URL
  const [donationAmount, setDonationAmount] = useState("");

  // Sample campaign data with state to update raised amount
  const [campaigns, setCampaigns] = useState([
    {
      id: "1",
      title: "Medical Emergency Fund",
      description: "Help John with his hospital bills.",
      goal: 5,
      raised: 2.5,
      receiver: "0xReceiverAddress1",
    },
    {
      id: "2",
      title: "Education Support",
      description: "Assist Maria with her tuition fees.",
      goal: 3,
      raised: 1.2,
      receiver: "0xReceiverAddress2",
    },
    {
      id: "3",
      title: "Housing Relief",
      description: "Support Alex to avoid eviction.",
      goal: 4,
      raised: 3.8,
      receiver: "0xReceiverAddress3",
    },
  ]);

  const campaign = campaigns.find((c) => c.id === id) || {};
  const isGoalReached = campaign.raised >= campaign.goal;

  const handleDonate = async () => {
    if (!account) {
      alert("Please connect your wallet first!");
      return;
    }
    if (!donationAmount || isNaN(donationAmount) || donationAmount <= 0) {
      alert("Please enter a valid donation amount!");
      return;
    }

    try {
      const donation = parseFloat(donationAmount);
      console.log(
        `Sending ${donation} ETH to ${campaign.receiver} from ${account}`
      );

      // Update the campaign's raised amount
      setCampaigns((prevCampaigns) =>
        prevCampaigns.map((c) =>
          c.id === id ? { ...c, raised: c.raised + donation } : c
        )
      );

      setDonationAmount("");
      alert("Donation successful! (Simulated)");
    } catch (error) {
      console.error("Donation failed:", error);
      alert("Donation failed!");
    }
  };

  if (!campaign.id) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <p>Campaign not found!</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center py-8">
      <h1 className="text-4xl font-bold text-white mb-8">{campaign.title}</h1>

      {/* Wallet Connection */}
      <div className="text-center mb-8">
        {!account ? (
          <Button onClick={connectWallet}>Connect Wallet</Button>
        ) : (
          <p className="text-gray-400">
            Connected: {account.slice(0, 6)}...{account.slice(-4)}
          </p>
        )}
      </div>

      {/* Campaign Details */}
      <div className="max-w-2xl w-full">
        <Card>
          <CardHeader>
            <CardTitle>{campaign.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-400 mb-2">{campaign.description}</p>
            <ProgressBar progress={campaign.raised} max={campaign.goal} />
            <p className="text-sm text-gray-500 mt-1">
              {campaign.raised} ETH raised of {campaign.goal} ETH
            </p>
            <p className="text-sm text-gray-500 mt-1">
              Receiver: {campaign.receiver.slice(0, 6)}...
              {campaign.receiver.slice(-4)}
            </p>

            {/* Conditional Rendering for Goal Status */}
            {isGoalReached ? (
              <p className="text-green-500 font-bold mt-4">
                Goal Reached! Thank you for your support!
              </p>
            ) : (
              <div className="mt-4 flex space-x-2">
                <input
                  type="number"
                  value={donationAmount}
                  onChange={(e) => setDonationAmount(e.target.value)}
                  placeholder="ETH amount"
                  className="px-2 py-1 bg-gray-700 text-white border border-gray-600 rounded"
                  step="0.01"
                />
                <Button variant="primary" onClick={handleDonate}>
                  Donate Now
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
