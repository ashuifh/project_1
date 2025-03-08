import React from 'react';
import { Play, Eraser, RotateCcw } from 'lucide-react';
import GridTab from './GridTab';
import SpeedTab from './SpeedTab';

export default function Controls({
  algorithm,
  setAlgorithm,
  drawMode,
  setDrawMode,
  solveMaze,
  resetMaze,
  gridSize,
  setGridSize,
  speed,
  setSpeed,
  isSolving
}) {
  const algorithms = [
    { value: 'DFS', label: 'Depth First Search' },
    { value: 'BFS', label: 'Breadth First Search' },
    { value: 'Dijkstra', label: "Dijkstra's Algorithm" },
    { value: 'Backtracking', label: 'Backtracking' }
  ];

  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
        <div className="space-x-4 flex items-center">
          <select
            value={algorithm}
            onChange={(e) => setAlgorithm(e.target.value)}
            className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {algorithms.map(({ value, label }) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </select>
          
          <button
            onClick={() => setDrawMode(drawMode === 1 ? 0 : 1)}
            className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors flex items-center gap-2"
            disabled={isSolving}
          >
            <Eraser className="w-4 h-4" />
            {drawMode === 1 ? 'Draw Wall' : 'Draw Path'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
          <GridTab gridSize={gridSize} setGridSize={setGridSize} isSolving={isSolving} />
          <div className="mt-4 flex gap-3">
            <button
              onClick={solveMaze}
              className="flex-1 px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isSolving}
            >
              <Play className="w-4 h-4" />
              {isSolving ? 'Solving...' : 'Solve'}
            </button>
            
            <button
              onClick={resetMaze}
              className="flex-1 px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
              disabled={isSolving}
            >
              <RotateCcw className="w-4 h-4" />
              Reset
            </button>
          </div>
        </div>
        <SpeedTab speed={speed} setSpeed={setSpeed} isSolving={isSolving} />
      </div>
    </div>
  );
}