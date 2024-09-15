import { MutableRefObject } from "react";
import { constructBorder } from "./constructBorder";
import { GridType, TileType } from "./types";

export async function selectStart(
  grid: GridType,
  startTile: TileType,
  endTile: TileType,
  isChangeStartSelectedRef: MutableRefObject<boolean>
) {
  isChangeStartSelectedRef.current = true;
  await constructBorder(grid, startTile, endTile);
}
