// src/components/CampaignForm.js
import React, { useState } from "react";
import Button from "./ui/Button";
import Card, { CardHeader, CardTitle, CardContent, CardFooter } from "./ui/Card";

export default function CampaignForm({ onSubmit, isConnected }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    goal: "",
    receiver: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    
    // Form validation
    if (!formData.title.trim()) {
      setError("Title is required");
      return;
    }
    
    if (!formData.description.trim()) {
      setError("Description is required");
      return;
    }
    
    if (!formData.goal || isNaN(formData.goal) || parseFloat(formData.goal) <= 0) {
      setError("Please enter a valid goal amount");
      return;
    }
    
    if (!formData.receiver.trim() || !formData.receiver.startsWith("0x") || formData.receiver.length !== 42) {
      setError("Please enter a valid Ethereum address");
      return;
    }
    
    setIsLoading(true);
    
    try {
      await onSubmit(formData);
      // Reset form after successful submission
      setFormData({
        title: "",
        description: "",
        goal: "",
        receiver: ""
      });
    } catch (err) {
      setError(err.message || "Failed to create campaign");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="border-gray-700 bg-gradient-to-b from-gray-800 to-gray-850 shadow-xl">
      <CardHeader>
        <CardTitle className="gradient-text">Create New Campaign</CardTitle>
      </CardHeader>
      <CardContent>
        {error && (
          <div className="bg-red-900 bg-opacity-50 border border-red-700 text-red-200 p-3 rounded-lg mb-4">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="title" className="block text-gray-300 mb-1">
                Campaign Title
              </label>
              <input
                id="title"
                name="title"
                type="text"
                value={formData.title}
                onChange={handleChange}
                placeholder="Medical Emergency Fund"
                className="w-full px-3 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                disabled={isLoading || !isConnected}
              />
            </div>
            
            <div>
              <label htmlFor="description" className="block text-gray-300 mb-1">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe the emergency situation and how the funds will help..."
                rows="4"
                className="w-full px-3 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                disabled={isLoading || !isConnected}
              />
            </div>
            
            <div>
              <label htmlFor="goal" className="block text-gray-300 mb-1">
                Funding Goal (ETH)
              </label>
              <input
                id="goal"
                name="goal"
                type="number"
                value={formData.goal}
                onChange={handleChange}
                placeholder="5.0"
                step="0.01"
                min="0.01"
                className="w-full px-3 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                disabled={isLoading || !isConnected}
              />
            </div>
            
            <div>
              <label htmlFor="receiver" className="block text-gray-300 mb-1">
                Recipient Address
              </label>
              <input
                id="receiver"
                name="receiver"
                type="text"
                value={formData.receiver}
                onChange={handleChange}
                placeholder="0x..."
                className="w-full px-3 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                disabled={isLoading || !isConnected}
              />
              <p className="text-sm text-gray-500 mt-1">
                Ethereum address where funds will be sent
              </p>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter>
        <div className="flex justify-end">
          <Button
            type="submit"
            onClick={handleSubmit}
            disabled={isLoading || !isConnected}
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
          >
            {isLoading ? "Creating..." : "Create Campaign"}
          </Button>
        </div>
        {!isConnected && (
          <p className="text-amber-500 text-sm mt-2">
            Connect your wallet to create a campaign
          </p>
        )}
      </CardFooter>
    </Card>
  );
}