import React from 'react';
import Maze from './components/Maze';
import Controls from './components/Controls';
import Legend from './components/Legend';
import Toast from './components/Toast';
import { useMazeSolver } from './hooks/useMazeSolver';

function App() {
  const {
    gridSize,
    grid,
    algorithm,
    path,
    currentPath,
    visited,
    drawMode,
    speed,
    isSolving,
    showError,
    setShowError,
    setAlgorithm,
    setDrawMode,
    setSpeed,
    handleMouseDown,
    handleMouseEnter,
    handleMouseUp,
    solveMaze,
    resetMaze,
    handleGridSizeChange
  } = useMazeSolver(15);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">
          Rat in a Maze Solver
        </h1>
        
        <div className="bg-white rounded-xl shadow-xl p-8 mb-8">
          <Controls
            algorithm={algorithm}
            setAlgorithm={setAlgorithm}
            drawMode={drawMode}
            setDrawMode={setDrawMode}
            solveMaze={solveMaze}
            resetMaze={resetMaze}
            gridSize={gridSize}
            setGridSize={handleGridSizeChange}
            speed={speed}
            setSpeed={setSpeed}
            isSolving={isSolving}
          />

          <div className="flex justify-center">
            <Maze 
              grid={grid} 
              path={path}
              currentPath={currentPath}
              visited={visited}
              handleMouseDown={handleMouseDown}
              handleMouseEnter={handleMouseEnter}
              handleMouseUp={handleMouseUp}
            />
          </div>
        </div>

        <Legend />

        <Toast 
          message="Unable to find a path to the goal!"
          isVisible={showError}
          onClose={() => setShowError(false)}
        />
      </div>
    </div>
  );
}

export default App;