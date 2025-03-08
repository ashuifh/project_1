import { DIRECTIONS, isValidCell } from './types';

export const dfs = (grid) => {
  const visited = new Set();
  const path = [];
  const explorationPath = [];
  const n = grid.length;
  const m = grid[0].length;

  const dfsUtil = (row, col) => {
    if (!isValidCell(grid, row, col)) return false;
    if (row === n - 1 && col === m - 1) {
      path.push([row, col]);
      return true;
    }

    visited.add(`${row},${col}`);
    explorationPath.push([row, col]);

    for (const [dx, dy] of DIRECTIONS) {
      const newRow = row + dx;
      const newCol = col + dy;
      if (!visited.has(`${newRow},${newCol}`) && dfsUtil(newRow, newCol)) {
        path.unshift([row, col]);
        return true;
      }
    }
    return false;
  };

  dfsUtil(0, 0);
  return { path, visited, explorationPath };
};