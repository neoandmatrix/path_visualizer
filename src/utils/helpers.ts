import { END_TILE_CONFIGURATION, MAX_COLS, MAX_ROWS } from "./constants";
import { GridType, TileType } from "./types";

const createRow = (row: number, startTile: TileType, endTile: TileType) => {
  const currentRow = [];

  for (let col = 0; col < MAX_COLS; col++) {
    currentRow.push({
      row,
      col,
      isEnd: row === endTile.row && col === endTile.col,
      isWall: false,
      isPath: false,
      distance: Infinity,
      isStart: row === startTile.row && col === startTile.col,
      isTraversed: false,
      parent: null,
    });
  }
  return currentRow;
};

export const Creategrid = (startTile: TileType, endTile: TileType) => {
  const grid: GridType = [];

  for (let row = 0; row < MAX_ROWS; row++) {
    grid.push(createRow(row, startTile, endTile));
  }
  return grid;
};

export const checkIfStartOrEnd = (row: number, col: number) => {
  return (
    (row === 1 && col === 1) || (row === MAX_ROWS - 2 && col === MAX_COLS - 2)
  );
};

export const createNewGrid = (grid: GridType, row: number, col: number) => {
  const newGrid = grid.slice();
  const newTile = {
    ...newGrid[row][col],
    isWall: !newGrid[row][col].isWall,
  };
  newGrid[row][col] = newTile;
  return newGrid;
};

export const resetCurrentStart = (
  grid: GridType,
  currentStartTile: TileType,
  row: number,
  col: number,
  setStartTile: (startTile: TileType) => void
) => {
  const newGrid = grid.slice();
  const newTile = {
    ...newGrid[currentStartTile.row][currentStartTile.col],
    isStart: !newGrid[currentStartTile.row][currentStartTile.col].isStart,
  };
  newGrid[currentStartTile.row][currentStartTile.col] = newTile;
  setStartTile({ ...currentStartTile, row: row, col: col });
  return newGrid;
};

export const resetCurrentEnd = (
  grid: GridType,
  currentEndTile: TileType,
  row: number,
  col: number,
  setEndTile: (endTile: TileType) => void
) => {
  const newGrid = grid.slice();
  const newTile = {
    ...newGrid[currentEndTile.row][currentEndTile.col],
    isEnd: !newGrid[currentEndTile.row][currentEndTile.col].isEnd,
  };
  newGrid[currentEndTile.row][currentEndTile.col] = newTile;
  setEndTile({ ...currentEndTile, row: row, col: col });
  return newGrid;
};


export const setNewStartTile = (
  grid: GridType,
  row: number,
  column: number
) => {
  const newGrid = grid.slice();
  if (newGrid[row][column].isWall) {
    return ;
  }
  const newTile = {
    ...newGrid[row][column],
    isStart: !newGrid[row][column].isStart,
  };
  newGrid[row][column] = newTile;
  return newGrid;
};

export const setNewEndTile = (
  grid: GridType,
  row: number,
  column: number
) => {
  const newGrid = grid.slice();
  if (newGrid[row][column].isWall) {
    return ;
  }
  const newTile = {
    ...newGrid[row][column],
    isEnd: !newGrid[row][column].isEnd,
  };
  newGrid[row][column] = newTile;
  return newGrid;
};

export const isEqual = (a: TileType, b: TileType) => {
  return a.row === b.row && a.col === b.col;
};

export const isRowColEqual = (row: number, col: number, tile: TileType) => {
  return row === tile.row && col === tile.col;
};

export const sleep = (ms: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};

export const getRandInt = (min: number, max: number) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
};

export const dropFromQueue = (tile: TileType, queue: TileType[]) => {
  for (let i = 0; i < queue.length; i++) {
    if (isEqual(tile, queue[i])) {
      queue.splice(i, 1);
      break;
    }
  }
};

export const getEulerDistance = (tile : TileType) => {
  const distance = Math.sqrt(Math.pow((END_TILE_CONFIGURATION.row-tile.row),2)+Math.pow((END_TILE_CONFIGURATION.col-tile.col),2))
  return parseFloat(distance.toFixed(2))
}