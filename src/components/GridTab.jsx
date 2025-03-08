import React from 'react';
import { Grid as GridIcon } from 'lucide-react';

const GridTab = ({ gridSize, setGridSize }) => {
  const sizes = [5, 7, 9, 11, 13, 15];
  
  return (
    <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
      <div className="flex items-center gap-2 mb-3">
        <GridIcon className="w-5 h-5 text-blue-500" />
        <h3 className="font-semibold text-gray-700">Grid Size</h3>
      </div>
      
      <div className="grid grid-cols-3 gap-2">
        {sizes.map(size => (
          <button
            key={size}
            onClick={() => setGridSize(size)}
            className={`
              px-4 py-2 rounded-lg text-sm font-medium transition-all
              ${gridSize === size 
                ? 'bg-blue-500 text-white shadow-md transform scale-105' 
                : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
              }
              flex items-center justify-center gap-2
            `}
          >
            <span className="text-lg font-semibold">{size}</span>
            <span className="text-xs opacity-75">×</span>
            <span className="text-lg font-semibold">{size}</span>
          </button>
        ))}
      </div>
      <p className="mt-2 text-xs text-gray-500 text-center">
        Click to change maze dimensions
      </p>
    </div>
  );
};

export default GridTab;