import { DIRECTIONS, isValidCell } from './types';

export const bfs = (grid) => {
  const visited = new Set();
  const queue = [[0, 0]];
  const parent = new Map();
  const explorationPath = [];
  const n = grid.length;
  const m = grid[0].length;

  // Mark start position as visited
  visited.add('0,0');

  while (queue.length > 0) {
    const [row, col] = queue.shift();
    explorationPath.push([row, col]);

    // If we reached the target
    if (row === n - 1 && col === m - 1) {
      const path = [];
      let current = [row, col];
      
      // Reconstruct path from end to start
      while (current) {
        path.unshift(current);
        const key = `${current[0]},${current[1]}`;
        current = parent.get(key);
      }
      
      return { path, visited, explorationPath };
    }

    // Check all four directions
    for (const [dx, dy] of DIRECTIONS) {
      const newRow = row + dx;
      const newCol = col + dy;
      const newKey = `${newRow},${newCol}`;

      if (isValidCell(grid, newRow, newCol) && !visited.has(newKey)) {
        visited.add(newKey);
        queue.push([newRow, newCol]);
        parent.set(newKey, [row, col]);
      }
    }
  }

  // No path found
  return { path: [], visited, explorationPath };
};