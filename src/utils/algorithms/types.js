// Common types and utilities for maze algorithms
export const DIRECTIONS = [
  [1, 0],  // down
  [0, 1],  // right
  [-1, 0], // up
  [0, -1]  // left
];

export const isValidCell = (grid, row, col) => {
  const n = grid.length;
  const m = grid[0].length;
  return row >= 0 && row < n && col >= 0 && col < m && grid[row][col] === 1;
};