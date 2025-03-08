import { DIRECTIONS, isValidCell } from './types';

export const dijkstra = (grid) => {
  const visited = new Set();
  const distances = new Map();
  const parent = new Map();
  const explorationPath = [];
  const n = grid.length;
  const m = grid[0].length;

  // Initialize distances
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      distances.set(`${i},${j}`, Infinity);
    }
  }
  distances.set('0,0', 0);

  while (true) {
    let minDist = Infinity;
    let current = null;

    // Find unvisited node with minimum distance
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < m; j++) {
        const key = `${i},${j}`;
        if (!visited.has(key) && distances.get(key) < minDist && grid[i][j] === 1) {
          minDist = distances.get(key);
          current = [i, j];
        }
      }
    }

    if (!current) break;
    const [row, col] = current;
    visited.add(`${row},${col}`);
    explorationPath.push([row, col]);

    if (row === n - 1 && col === m - 1) {
      const path = [];
      let curr = [row, col];
      while (curr) {
        path.unshift(curr);
        curr = parent.get(`${curr[0]},${curr[1]}`);
      }
      return { path, visited, explorationPath };
    }

    for (const [dx, dy] of DIRECTIONS) {
      const newRow = row + dx;
      const newCol = col + dy;
      const newKey = `${newRow},${newCol}`;

      if (isValidCell(grid, newRow, newCol) && !visited.has(newKey)) {
        const newDist = distances.get(`${row},${col}`) + 1;
        if (newDist < distances.get(newKey)) {
          distances.set(newKey, newDist);
          parent.set(newKey, [row, col]);
        }
      }
    }
  }

  return { path: [], visited, explorationPath };
};