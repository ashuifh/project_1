import React from 'react';
import { XCircle } from 'lucide-react';

export default function Toast({ message, isVisible, onClose }) {
  if (!isVisible) return null;

  return (
    <div className="fixed top-4 right-4 flex items-center gap-2 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded shadow-lg animate-fade-in">
      <XCircle className="w-5 h-5" />
      <p>{message}</p>
      <button 
        onClick={onClose}
        className="ml-4 text-red-700 hover:text-red-900"
      >
        ×
      </button>
    </div>
  );
}