import { getUntraversedNeighbours } from "../../../utils/getUntraversedneighbours";
import { getEulerDistance, isEqual } from "../../../utils/helpers";
import { isInQueue } from "../../../utils/isInQueue";
import { GridType, TileType } from "../../../utils/types";

export const aStar = (
  grid: GridType,
  startTile: TileType,
  endTile: TileType
) => {
  const traversedTiles: TileType[] = [];
  const baseTile = grid[startTile.row][startTile.col];
  baseTile.distance = 0;
  baseTile.isTraversed = true;
  const unTraversed = [baseTile];

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
    for (let i = 0; i < neighbors.length; i++) {
      if (!isInQueue(neighbors[i], unTraversed)) {
        const neighbour = neighbors[i];
        neighbour.distance = tile.distance + getEulerDistance(neighbour);
        neighbour.parent = tile;
        unTraversed.push(neighbour);
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
