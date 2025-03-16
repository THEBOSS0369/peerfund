"use client";
import { useState } from "react";
import Link from "next/link";
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

  const campaigns = [
    {
      id: 1,
      title: "Medical Emergency Fund",
      description: "Help John with his hospital bills.",
      goal: 5, // ETH
      raised: 2.5, // ETH
      receiver: "0xReceiverAddress1",
    },
    {
      id: 2,
      title: "Education Support",
      description: "Assist Maria with her tuition fees.",
      goal: 3, // ETH
      raised: 1.2, // ETH
      receiver: "0xReceiverAddress2",
    },
    {
      id: 3,
      title: "Housing Relief",
      description: "Support Alex to avoid eviction.",
      goal: 4, // ETH
      raised: 3.8, // ETH
      receiver: "0xReceiverAddress3",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-8">
      <div className="w-full max-w-6xl bg-white p-8 rounded-lg shadow-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <div>
            <h1 className="text-5xl font-bold text-gray-900">
              Responsible Banking Made Easier
            </h1>
            <p className="text-gray-600 mt-4">
              Financial services, including P2P payments, balance check, and
              top-ups, are now available from any mobile app.
            </p>
            <Button className="mt-6">Download Application</Button>
          </div>
          <div>
            <img
              src="/banking-ui.png"
              alt="Banking UI"
              className="rounded-lg"
            />
          </div>
        </div>
      </div>

      {/* Wallet Connection */}
      <div className="text-center my-8">
        {!account ? (
          <Button onClick={connectWallet}>Connect Wallet</Button>
        ) : (
          <p className="text-gray-600">
            Connected: {account.slice(0, 6)}...{account.slice(-4)}
          </p>
        )}
      </div>

      {/* Campaign List */}
      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-3 gap-6">
        {campaigns.map((campaign) => (
          <Link href={`/campaign/${campaign.id}`} key={campaign.id}>
            <Card className="hover:bg-gray-200 transition-colors cursor-pointer">
              <CardHeader>
                <CardTitle>{campaign.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-2">{campaign.description}</p>
                <ProgressBar progress={campaign.raised} max={campaign.goal} />
                <p className="text-sm text-gray-500 mt-1">
                  {campaign.raised} ETH raised of {campaign.goal} ETH
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  Receiver: {campaign.receiver.slice(0, 6)}...
                  {campaign.receiver.slice(-4)}
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Call to Action */}
      <div className="text-center mt-8">
        <Button variant="primary" className="text-lg px-6 py-3">
          Create a Campaign
        </Button>
      </div>
    </div>
  );
}
