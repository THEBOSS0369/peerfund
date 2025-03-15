// src/app/page.js
"use client";
import { useState } from "react";
import Button from "../components/ui/Button";
import Card, {
  CardHeader,
  CardTitle,
  CardContent,
} from "../components/ui/Card";
import ProgressBar from "../components/ui/ProgressBar";
import useWallet from "../hooks/useWallet";

export default function Home() {
  const { account, connectWallet } = useWallet();
  const [donationAmount, setDonationAmount] = useState("");
  const [campaign, setCampaign] = useState({
    id: 1,
    title: "Medical Emergency Fund",
    description: "Help John with his hospital bills.",
    goal: 5, // ETH
    raised: 2.5, // ETH
    receiver: "0xReceiverAddress", // Placeholder receiver address
  });

  const handleDonate = async () => {
    if (!account) {
      alert("Please connect your wallet first!");
      return;
    }
    if (!donationAmount || isNaN(donationAmount) || donationAmount <= 0) {
      alert("Please enter a valid donation amount!");
      return;
    }

    // Simulate sending ETH (replace with real contract call)
    try {
      console.log(
        `Sending ${donationAmount} ETH to ${campaign.receiver} from ${account}`
      );
      // Placeholder for smart contract interaction:
      // const tx = await contract.donate(campaign.id, { value: ethers.utils.parseEther(donationAmount) });
      // await tx.wait();

      setCampaign((prev) => ({
        ...prev,
        raised: prev.raised + parseFloat(donationAmount),
      }));
      setDonationAmount("");
      alert("Donation successful! (Simulated)");
    } catch (error) {
      console.error("Donation failed:", error);
      alert("Donation failed!");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center py-8">
      <h1 className="text-4xl font-bold text-white mb-8">
        Emergency Fund Platform
      </h1>

      <div className="max-w-2xl w-full space-y-6">
        {/* Wallet Connection */}
        <div className="text-center">
          {!account ? (
            <Button onClick={connectWallet}>Connect Wallet</Button>
          ) : (
            <p className="text-gray-400">
              Connected: {account.slice(0, 6)}...{account.slice(-4)}
            </p>
          )}
        </div>

        {/* Campaign Card */}
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
              <Button variant="secondary">View Details</Button>
            </div>
          </CardContent>
        </Card>

        {/* Call to Action */}
        <div className="text-center">
          <Button variant="primary" className="text-lg px-6 py-3">
            Create a Campaign
          </Button>
        </div>
      </div>
    </div>
  );
}
