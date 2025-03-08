/**
 * Get the className for a maze cell based on its state
 */
export const getMazeCellClassName = (row, col, { 
  grid = [], 
  path = [], 
  currentPath = [], 
  visited = new Set() 
} = {}) => {
  const isPath = path?.some(([r, c]) => r === row && c === col) || false;
  const isExploring = currentPath?.some(([r, c]) => r === row && c === col) || false;
  const isVisited = visited?.has(`${row},${col}`) || false;
  const isWall = grid[row]?.[col] === 0;

  return `maze-cell ${
    isWall ? 'wall' :
    isPath ? 'path' :
    isExploring ? 'exploring' :
    isVisited ? 'visited' : 'bg-white'
  }`;
};