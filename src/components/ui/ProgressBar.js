// src/components/ui/ProgressBar.js
import React from "react";

export default function ProgressBar({ progress = 0, max = 100 }) {
  const percentage = Math.min((progress / max) * 100, 100);

  return (
    <div className="w-full bg-gray-700 rounded-full h-4">
      <div
        className="bg-green-500 h-4 rounded-full transition-all duration-300"
        style={{ width: `${percentage}%` }}
      ></div>
    </div>
  );
}
