import { getUntraversedNeighbours } from "../../../utils/getUntraversedneighbours";
import { dropFromQueue, isEqual } from "../../../utils/helpers";
import { isInQueue } from "../../../utils/isInQueue";
import { GridType, TileType } from "../../../utils/types";

export const djkistra = (
  grid: GridType,
  startTile: TileType,
  endTile: TileType
) => {
  const traversedTiles: TileType[] = [];
  const base = grid[startTile.row][startTile.col];
  base.distance = 0;
  base.isTraversed = true;
  const unTraversed = [base];

  while (unTraversed.length) {
    unTraversed.sort((a, b) => {
      return a.distance - b.distance;
    });
    const tile = unTraversed.shift() as TileType;
    if (tile.isWall) continue;
    if (tile.distance === Infinity) break;
    tile.isTraversed = true;
    traversedTiles.push(tile);
    if (isEqual(tile, endTile)) break;

    const neighbors = getUntraversedNeighbours(grid, tile);
    for (let i = 0; i < neighbors.length; i += 1) {
      if (!isInQueue(neighbors[i], unTraversed)) {
        let neighbour = neighbors[i];
        if (tile.distance + 1 < neighbour.distance) {
          dropFromQueue(neighbour, unTraversed);
          neighbour.distance = tile.distance + 1;
          neighbour.parent = tile;
          unTraversed.push(neighbour);
        }
      }
    }
  }

  const path = [];
  let tile = grid[endTile.row][endTile.col];
  while (tile !== null) {
    tile.isPath = true;
    path.unshift(tile);
    tile = tile.parent!;
  }
  return { traversedTiles, path };
};
