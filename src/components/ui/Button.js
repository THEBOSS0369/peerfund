// src/components/ui/Button.js
import React from "react";

export default function Button({ 
  variant = "primary", 
  children, 
  className = "", 
  disabled = false,
  ...props 
}) {
  const baseStyles = "px-4 py-2 rounded-lg font-medium focus:outline-none transition-all duration-200 shadow-md";
  
  const variantStyles = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800 disabled:bg-blue-800 disabled:opacity-50",
    secondary: "bg-gray-700 text-gray-200 hover:bg-gray-600 active:bg-gray-500 disabled:bg-gray-800 disabled:opacity-50",
    outline: "bg-transparent border border-blue-500 text-blue-400 hover:bg-blue-900 hover:bg-opacity-20 active:bg-blue-900 active:bg-opacity-30 disabled:opacity-50",
    danger: "bg-red-600 text-white hover:bg-red-700 active:bg-red-800 disabled:bg-red-800 disabled:opacity-50",
    success: "bg-green-600 text-white hover:bg-green-700 active:bg-green-800 disabled:bg-green-800 disabled:opacity-50",
  };

  const disabledStyles = disabled ? "cursor-not-allowed" : "";

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${disabledStyles} ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}