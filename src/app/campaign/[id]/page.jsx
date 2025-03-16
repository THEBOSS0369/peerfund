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
  const { id } = useParams();
  const [donationAmount, setDonationAmount] = useState("");

  const [campaigns] = useState([
    {
      id: "1",
      title: "Medical Emergency Fund",
      description: "Help John with his hospital bills.",
      goal: 5,
      raised: 2.5,
      receiver: "0xReceiverAddress1",
      receiverPhoto: "/alex.jpeg",
      proofVerified: true,
    },
    {
      id: "2",
      title: "Education Support",
      description: "Assist Maria with her tuition fees.",
      goal: 3,
      raised: 1.2,
      receiver: "0xReceiverAddress2",
      receiverPhoto: "/martha.avif",
      proofVerified: false,
    },
    {
      id: "3",
      title: "Housing Relief",
      description: "Support Alex to avoid eviction.",
      goal: 4,
      raised: 3.8,
      receiver: "0xReceiverAddress3",
      receiverPhoto: "/mark.jpg",
      proofVerified: true,
    },
  ]);

  const campaign = campaigns.find((c) => c.id === id) || {};
  const isGoalReached = campaign.raised >= campaign.goal;

  const senderBalance = "1.5 ETH";

  const handleDonate = () => {
    if (!account) {
      alert("Please connect your wallet first!");
      return;
    }
    if (!donationAmount || isNaN(donationAmount) || donationAmount <= 0) {
      alert("Please enter a valid donation amount!");
      return;
    }
    alert("Donation successful! (Simulated)");
    setDonationAmount("");
  };

  if (!campaign.id) {
    return (
      <div className="min-h-screen flex items-center justify-center text-black">
        <p>Campaign not found!</p>
      </div>
    );
  }

  const progressPercentage = campaign.goal
    ? (campaign.raised / campaign.goal) * 100
    : 0;

  return (
    <div className="min-h-screen flex flex-col items-center py-8 bg-white">
      <h1 className="text-4xl font-bold text-black mb-8">{campaign.title}</h1>

      <div className="text-center mb-4">
        {!account ? (
          <Button onClick={connectWallet}>Connect Wallet</Button>
        ) : (
          <p className="text-gray-700">
            Connected: {account.slice(0, 6)}...{account.slice(-4)}
          </p>
        )}
      </div>

      <div className="max-w-xl w-full">
        <Card className="flex flex-col items-center text-center">
          <CardHeader>
            <CardTitle>{campaign.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 mb-2">{campaign.description}</p>
            <ProgressBar progress={progressPercentage} />
            <p className="text-sm text-gray-500 mt-1">
              {campaign.raised} ETH raised of {campaign.goal} ETH
            </p>
            <p className="text-sm text-gray-500 mt-1">
              Receiver: {campaign.receiver.slice(0, 6)}...
              {campaign.receiver.slice(-4)}
            </p>
            <p className="text-sm font-bold text-blue-600 mt-2">
              Sender's Balance: {senderBalance}
            </p>

            <div className="mt-4 flex flex-col items-center">
              <img
                src={campaign.receiverPhoto}
                alt="Receiver"
                className="w-36 h-36 rounded-full border mb-2"
              />
              <p className="text-sm font-bold">Receiver's Proof:</p>
              <p
                className={`mt-2 font-bold ${
                  campaign.proofVerified ? "text-green-500" : "text-red-500"
                }`}
              >
                {campaign.proofVerified
                  ? "✅ Verified"
                  : "❌ Not Verified / Scam"}
              </p>
            </div>

            {isGoalReached ? (
              <p className="text-green-500 font-bold mt-4">
                Goal Reached! Thank you for your support!
              </p>
            ) : (
              <div className="mt-4 flex flex-col items-center">
                <input
                  type="number"
                  value={donationAmount}
                  onChange={(e) => setDonationAmount(e.target.value)}
                  placeholder="ETH amount"
                  className="px-2 py-1 bg-gray-200 text-black border border-gray-400 rounded mb-2"
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
