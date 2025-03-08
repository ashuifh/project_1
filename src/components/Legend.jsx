import React from 'react';
import { Rat, Cookie } from 'lucide-react';

const Legend = () => {
  return (
    <div className="bg-white rounded-xl shadow-xl p-6">
      <h2 className="text-xl font-semibold mb-4">How it works</h2>
      <div className="grid grid-cols-3 gap-4">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-white border border-gray-300"></div>
          <span>Empty Path</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-gray-800"></div>
          <span>Wall</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-blue-200"></div>
          <span>Visited</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-green-300"></div>
          <span>Solution Path</span>
        </div>
        <div className="flex items-center gap-2">
          <Rat className="w-4 h-4" />
          <span>Start</span>
        </div>
        <div className="flex items-center gap-2">
          <Cookie className="w-4 h-4 text-yellow-500" />
          <span>Goal</span>
        </div>
      </div>
    </div>
  );
};

export default Legend;