// Grid creation and speed utilities
export const createEmptyGrid = (size) => {
  return Array(size).fill(null).map(() => Array(size).fill(1));
};

export const getSpeedValue = (speed) => {
  const speeds = {
    fast: 5,     // Ultra fast
    medium: 15,  // Very fast
    slow: 30     // Moderately fast
  };
  return speeds[speed] || speeds.medium;
};