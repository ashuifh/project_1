import React from 'react';
import { Rat, Cookie } from 'lucide-react';
import { getMazeCellClassName } from '../utils/mazeUtils';

const Maze = ({ 
  grid = [], 
  path = [], 
  currentPath = [], 
  visited = new Set(),
  handleMouseDown,
  handleMouseEnter,
  handleMouseUp
}) => {
  return (
    <div className="p-6 bg-white/50 backdrop-blur-sm rounded-2xl shadow-xl">
      <div className="grid gap-1">
        {grid.map((row, rowIndex) => (
          <div key={rowIndex} className="flex gap-1">
            {row.map((cell, colIndex) => (
              <div
                key={`${rowIndex}-${colIndex}`}
                className={getMazeCellClassName(rowIndex, colIndex, {
                  grid,
                  path,
                  currentPath,
                  visited
                })}
                onMouseDown={() => handleMouseDown?.(rowIndex, colIndex)}
                onMouseEnter={() => handleMouseEnter?.(rowIndex, colIndex)}
                onMouseUp={handleMouseUp}
              >
                {rowIndex === 0 && colIndex === 0 && (
                  <div className="w-full h-full flex items-center justify-center">
                    <Rat className="w-8 h-8 text-indigo-600 animate-bounce" />
                  </div>
                )}
                {rowIndex === grid.length - 1 && colIndex === grid[0].length - 1 && cell === 1 && (
                  <div className="w-full h-full flex items-center justify-center">
                    <Cookie className="w-8 h-8 text-amber-500 animate-pulse" />
                  </div>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Maze;