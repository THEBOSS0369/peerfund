import { useState } from "react";

export default function useWallet() {
  const [account, setAccount] = useState(null);

  const connectWallet = async () => {
    // Simulate wallet connection (replace with real Web3 provider like ethers.js)
    try {
      const simulatedAccount = "0x1234...5678"; // Placeholder
      setAccount(simulatedAccount);
      return simulatedAccount;
    } catch (error) {
      console.error("Wallet connection failed:", error);
    }
  };

  return { account, connectWallet };
}
