import { MAX_COLS, MAX_ROWS } from "./constants";
import { GridType, TileType } from "./types";

export const getUntraversedNeighbours = (grid: GridType, tile: TileType) => {
  const { row, col } = tile;
  const neighbours = [];

  //* the order of if statements define in whibh direction the searching will begin here for example column is pushed first

  if (col < MAX_COLS - 1) {
    neighbours.push(grid[row][col + 1]);
  }

  if (row > 0) {
    neighbours.push(grid[row - 1][col]);
  }
  if (row < MAX_ROWS - 1) {
    neighbours.push(grid[row + 1][col]);
  }
  if (col > 0) {
    neighbours.push(grid[row][col - 1]); // by mistake was +1 which was pushing an undefined thing in the array breaking the program
  }

  return neighbours.filter((neighbour) => !neighbour.isTraversed);
};
