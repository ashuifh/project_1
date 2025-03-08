import { DIRECTIONS, isValidCell } from './types';

export const backtracking = (grid) => {
  const visited = new Set();
  const path = [];
  const explorationPath = [];
  const n = grid.length;
  const m = grid[0].length;

  const backtrack = (row, col, currentPath = []) => {
    if (!isValidCell(grid, row, col) || visited.has(`${row},${col}`)) {
      return false;
    }

    currentPath.push([row, col]);
    visited.add(`${row},${col}`);
    explorationPath.push([row, col]);

    if (row === n - 1 && col === m - 1) {
      path.push(...currentPath);
      return true;
    }

    for (const [dx, dy] of DIRECTIONS) {
      const newRow = row + dx;
      const newCol = col + dy;
      
      if (backtrack(newRow, newCol, currentPath)) {
        return true;
      }
    }

    currentPath.pop();
    explorationPath.push([row, col]); // Show backtracking steps
    return false;
  };

  backtrack(0, 0, []);
  return { path, visited, explorationPath };
};