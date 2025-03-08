import { Grid } from '../types/maze';

export const createEmptyGrid = (size: number): Grid => {
  return Array(size).fill(null).map(() => Array(size).fill(1));
};

export const getSpeedValue = (speed: string): number => {
  const speeds = {
    fast: 50,
    medium: 150,
    slow: 300
  };
  return speeds[speed as keyof typeof speeds] || speeds.medium;
};