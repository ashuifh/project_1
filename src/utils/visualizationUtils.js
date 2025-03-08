import { getSpeedValue } from './gridUtils';

// Batch processing utility
const processBatch = async (items, batchSize, processFunction, delay) => {
  for (let i = 0; i < items.length; i += batchSize) {
    const batch = items.slice(i, i + batchSize);
    processFunction(batch);
    await new Promise(resolve => setTimeout(resolve, delay));
  }
};

export const handleMazeVisualization = async ({
  finalPath,
  visitedCells,
  explorationPath,
  speed,
  setCurrentPath,
  setPath,
  setVisited,
  setIsSolving
}) => {
  const delay = getSpeedValue(speed);
  setIsSolving(true);
  
  // Process exploration path
  await processBatch(
    explorationPath,
    3,
    (batch) => {
      setCurrentPath(prev => [...prev, ...batch]);
      batch.forEach(([row, col]) => {
        setVisited(prev => new Set([...prev, `${row},${col}`]));
      });
    },
    delay
  );

  // Clear exploration path
  setCurrentPath([]);
  
  // Process final path
  await processBatch(
    finalPath,
    2,
    (batch) => setPath(finalPath.slice(0, finalPath.indexOf(batch[batch.length - 1]) + 1)),
    delay
  );
  
  setIsSolving(false);
};