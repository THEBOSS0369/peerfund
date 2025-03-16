// src/components/ui/Card.js
import React from "react";

export default function Card({ children, className = "", ...props }) {
  return (
    <div
      className={`rounded-xl shadow-lg p-4 bg-gray-800 text-gray-200 border border-gray-700 backdrop-blur-sm ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({ children, className = "", ...props }) {
  return (
    <div className={`mb-4 pb-2 border-b border-gray-700 ${className}`} {...props}>
      {children}
    </div>
  );
}

export function CardTitle({ children, className = "", ...props }) {
  return (
    <h2 className={`text-2xl font-bold text-white ${className}`} {...props}>
      {children}
    </h2>
  );
}

export function CardContent({ children, className = "", ...props }) {
  return (
    <div className={className} {...props}>
      {children}
    </div>
  );
}

export function CardFooter({ children, className = "", ...props }) {
  return (
    <div className={`mt-4 pt-2 border-t border-gray-700 ${className}`} {...props}>
      {children}
    </div>
  );
}