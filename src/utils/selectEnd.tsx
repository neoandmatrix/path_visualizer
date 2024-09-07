import { MutableRefObject } from "react";
import { constructBorder } from "./constructBorder";
import { GridType, TileType } from "./types";

export async function selectEnd(
  grid: GridType,
  startTile: TileType,
  endTile: TileType,
  isChangeEndSelectedRef: MutableRefObject<boolean>
) {
  isChangeEndSelectedRef.current = true;
  await constructBorder(grid, startTile, endTile);
}
