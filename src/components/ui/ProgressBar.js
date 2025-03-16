// src/components/ui/ProgressBar.js
import React from "react";

export default function ProgressBar({ progress = 0, max = 100, className = "", ...props }) {
  const percentage = Math.min((progress / max) * 100, 100);
  const getColor = (percent) => {
    if (percent < 25) return "bg-gradient-to-r from-red-500 to-orange-500";
    if (percent < 50) return "bg-gradient-to-r from-orange-500 to-yellow-500";
    if (percent < 75) return "bg-gradient-to-r from-yellow-500 to-green-500";
    return "bg-gradient-to-r from-green-500 to-teal-500";
  };

  return (
    <div className={`w-full bg-gray-700 rounded-full h-4 overflow-hidden shadow-inner ${className}`} {...props}>
      <div
        className={`h-4 rounded-full transition-all duration-500 ${getColor(percentage)}`}
        style={{ width: `${percentage}%` }}
      >
        {percentage > 15 && (
          <div className="h-full w-full flex items-center justify-center">
            <span className="text-xs font-bold text-white shadow-sm">
              {Math.round(percentage)}%
            </span>
          </div>
        )}
      </div>
    </div>
  );
}