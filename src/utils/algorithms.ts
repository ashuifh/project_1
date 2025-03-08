// Utility function to check if a position is valid
const isValid = (
  grid: number[][],
  row: number,
  col: number
): boolean => {
  const n = grid.length;
  const m = grid[0].length;
  return row >= 0 && row < n && col >= 0 && col < m && grid[row][col] === 1;
};

// DFS implementation
export const dfs = (grid: number[][]): {
  path: [number, number][];
  visited: Set<string>;
} => {
  const visited = new Set<string>();
  const path: [number, number][] = [];
  const n = grid.length;
  const m = grid[0].length;

  const dfsUtil = (row: number, col: number): boolean => {
    if (!isValid(grid, row, col)) return false;
    if (row === n - 1 && col === m - 1) {
      path.push([row, col]);
      return true;
    }

    visited.add(`${row},${col}`);
    const directions = [[1, 0], [0, 1], [-1, 0], [0, -1]];

    for (const [dx, dy] of directions) {
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
  return { path, visited };
};

// BFS implementation
export const bfs = (grid: number[][]): {
  path: [number, number][];
  visited: Set<string>;
} => {
  const visited = new Set<string>();
  const queue: [number, number][] = [[0, 0]];
  const parent = new Map<string, [number, number]>();
  const n = grid.length;
  const m = grid[0].length;

  while (queue.length > 0) {
    const [row, col] = queue.shift()!;
    const key = `${row},${col}`;

    if (row === n - 1 && col === m - 1) {
      const path: [number, number][] = [];
      let current: [number, number] = [row, col];
      while (current) {
        path.unshift(current);
        const parentKey = `${current[0]},${current[1]}`;
        current = parent.get(parentKey)!;
        if (current?.[0] === 0 && current?.[1] === 0) {
          path.unshift(current);
          break;
        }
      }
      return { path, visited };
    }

    const directions = [[1, 0], [0, 1], [-1, 0], [0, -1]];
    for (const [dx, dy] of directions) {
      const newRow = row + dx;
      const newCol = col + dy;
      const newKey = `${newRow},${newCol}`;

      if (isValid(grid, newRow, newCol) && !visited.has(newKey)) {
        visited.add(newKey);
        queue.push([newRow, newCol]);
        parent.set(newKey, [row, col]);
      }
    }
  }

  return { path: [], visited };
};

// Dijkstra's implementation
export const dijkstra = (grid: number[][]): {
  path: [number, number][];
  visited: Set<string>;
} => {
  const visited = new Set<string>();
  const distances = new Map<string, number>();
  const parent = new Map<string, [number, number]>();
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
    let current: [number, number] | null = null;

    // Find unvisited node with minimum distance
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < m; j++) {
        const key = `${i},${j}`;
        if (!visited.has(key) && distances.get(key)! < minDist && grid[i][j] === 1) {
          minDist = distances.get(key)!;
          current = [i, j];
        }
      }
    }

    if (!current) break;
    const [row, col] = current;
    visited.add(`${row},${col}`);

    if (row === n - 1 && col === m - 1) {
      const path: [number, number][] = [];
      let curr: [number, number] = [row, col];
      while (curr) {
        path.unshift(curr);
        curr = parent.get(`${curr[0]},${curr[1]}`)!;
        if (curr?.[0] === 0 && curr?.[1] === 0) {
          path.unshift(curr);
          break;
        }
      }
      return { path, visited };
    }

    const directions = [[1, 0], [0, 1], [-1, 0], [0, -1]];
    for (const [dx, dy] of directions) {
      const newRow = row + dx;
      const newCol = col + dy;
      const newKey = `${newRow},${newCol}`;

      if (isValid(grid, newRow, newCol) && !visited.has(newKey)) {
        const newDist = distances.get(`${row},${col}`)! + 1;
        if (newDist < distances.get(newKey)!) {
          distances.set(newKey, newDist);
          parent.set(newKey, [row, col]);
        }
      }
    }
  }

  return { path: [], visited };
};