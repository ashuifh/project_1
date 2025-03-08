import { useState, useCallback } from 'react';
import { createEmptyGrid } from '../utils/gridUtils';
import { dfs, bfs, dijkstra, backtracking } from '../utils/algorithms';
import { handleMazeVisualization } from '../utils/visualizationUtils';

export function useMazeSolver(initialSize = 5) {
  const [gridSize, setGridSize] = useState(initialSize);
  const [grid, setGrid] = useState(createEmptyGrid(gridSize));
  const [algorithm, setAlgorithm] = useState('DFS');
  const [path, setPath] = useState([]);
  const [currentPath, setCurrentPath] = useState([]);
  const [visited, setVisited] = useState(new Set());
  const [isDrawing, setIsDrawing] = useState(false);
  const [drawMode, setDrawMode] = useState(0);
  const [speed, setSpeed] = useState('fast');
  const [isSolving, setIsSolving] = useState(false);
  const [showError, setShowError] = useState(false);

  const handleCellClick = useCallback((row, col) => {
    if (row === 0 && col === 0) return;
    if (row === grid.length - 1 && col === grid[0].length - 1) return;

    setGrid(prevGrid => 
      prevGrid.map((r, i) =>
        r.map((c, j) => (i === row && j === col ? drawMode : c))
      )
    );
  }, [grid, drawMode]);

  const handleMouseDown = useCallback((row, col) => {
    setIsDrawing(true);
    handleCellClick(row, col);
  }, [handleCellClick]);

  const handleMouseEnter = useCallback((row, col) => {
    if (isDrawing) {
      handleCellClick(row, col);
    }
  }, [isDrawing, handleCellClick]);

  const handleMouseUp = useCallback(() => {
    setIsDrawing(false);
  }, []);

  const solveMaze = useCallback(async () => {
    if (isSolving) return;

    setPath([]);
    setCurrentPath([]);
    setVisited(new Set());
    setShowError(false);

    const solvers = { 
      DFS: dfs, 
      BFS: bfs, 
      Dijkstra: dijkstra,
      Backtracking: backtracking
    };
    
    const solver = solvers[algorithm] || dfs;
    const result = solver(grid);
    
    if (result.path.length > 0) {
      await handleMazeVisualization({
        finalPath: result.path,
        visitedCells: result.visited,
        explorationPath: result.explorationPath,
        speed,
        setCurrentPath,
        setPath,
        setVisited,
        setIsSolving
      });
    } else {
      setShowError(true);
      setIsSolving(false);
    }
  }, [algorithm, grid, speed, isSolving]);

  const resetMaze = useCallback(() => {
    setGrid(createEmptyGrid(gridSize));
    setPath([]);
    setCurrentPath([]);
    setVisited(new Set());
    setShowError(false);
  }, [gridSize]);

  const handleGridSizeChange = useCallback((newSize) => {
    setGridSize(newSize);
    setGrid(createEmptyGrid(newSize));
    setPath([]);
    setCurrentPath([]);
    setVisited(new Set());
    setShowError(false);
  }, []);

  return {
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
  };
}