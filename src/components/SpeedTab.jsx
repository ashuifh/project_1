import React from 'react';
import { Timer } from 'lucide-react';

const SpeedTab = ({ speed, setSpeed }) => {
  const speeds = [
    { value: 'fast', label: 'Fast', color: 'bg-green-500' },
    { value: 'medium', label: 'Medium', color: 'bg-yellow-500' },
    { value: 'slow', label: 'Slow', color: 'bg-red-500' }
  ];

  return (
    <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
      <div className="flex items-center gap-2 mb-3">
        <Timer className="w-5 h-5 text-blue-500" />
        <h3 className="font-semibold text-gray-700">Animation Speed</h3>
      </div>
      
      <div className="grid grid-cols-3 gap-2">
        {speeds.map(({ value, label, color }) => (
          <button
            key={value}
            onClick={() => setSpeed(value)}
            className={`px-3 py-2 rounded-md text-sm font-medium transition-colors relative
              ${speed === value 
                ? 'bg-blue-500 text-white' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
          >
            {label}
            <span className={`absolute top-1 right-1 w-2 h-2 rounded-full ${color}`}></span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default SpeedTab;