import { twMerge } from "tailwind-merge";
import { usePathFinding } from "../hooks/usePathFinding";
import { MAX_COLS, MAX_ROWS } from "../utils/constants";
import { Tile } from "./Tile";
import { MutableRefObject, useState } from "react";
import { checkIfStartOrEnd, createNewGrid, resetCurrentStart, setNewStartTile } from "../utils/helpers";
import { useTile } from "../hooks/useTile";

export function Grid({
  isVisualizationRunningRef,
  isChangeStartSelectedRef,
}: {
  isVisualizationRunningRef: MutableRefObject<boolean>;
  isChangeStartSelectedRef: MutableRefObject<boolean>;
}) {
  const { grid, setGrid } = usePathFinding();
  const [isMouseDown, setIsMouseDown] = useState<boolean>(false);
  const {startTile,setStartTile} = useTile();

  const handleMouseDown = (row: number, col: number) => {
    if (
      isVisualizationRunningRef.current ||
      checkIfStartOrEnd(row, col) ||
      isChangeStartSelectedRef.current
    ) {
      return;
    }

    setIsMouseDown(true);
    const newGrid = createNewGrid(grid, row, col);
    setGrid(newGrid);
  };

  const handleMouseUp = (row: number, col: number) => {
    if (
      isVisualizationRunningRef.current ||
      checkIfStartOrEnd(row, col) ||
      isChangeStartSelectedRef.current
    ) {
      return;
    }

    setIsMouseDown(false);
  };

  const handleMouseEnter = (row: number, col: number) => {
    if (
      isVisualizationRunningRef.current ||
      checkIfStartOrEnd(row, col) ||
      isChangeStartSelectedRef.current
    ) {
      return;
    }

    if (isMouseDown) {
      const newGrid = createNewGrid(grid, row, col);
      setGrid(newGrid);
    }
  };

  const handleMouseClick = (row: number, col: number) => {
    if (!isChangeStartSelectedRef.current) {
      return;
    }
    
    const newSelectedStartTile = setNewStartTile(grid,row,col);
    setGrid(newSelectedStartTile);
    setGrid(resetCurrentStart(grid,startTile,row,col,setStartTile))
    isChangeStartSelectedRef.current = false
  };

  return (
    <div
      className={twMerge(
        // base classes
        "flex items-center flex-col justify-center border-sky-300 my-3",
        // manage height of grid
        `lg:min-h-[${MAX_ROWS * 17}px] md:min-h-[${
          MAX_ROWS * 15
        }px] xs:min-h-[${MAX_ROWS * 8}] min-h-[${MAX_ROWS * 7}px]`,
        // manage width of grid
        `lg:w-[${MAX_COLS * 17}px] md:w-[${MAX_COLS * 15}px] xs:w-[${
          MAX_COLS * 8
        }px] w-[${MAX_COLS * 7}px]`
      )}
    >
      {grid.map((r, rowIndex) => (
        <div key={rowIndex} className="flex">
          {r.map((tile, tileIndex) => {
            const { row, col, isEnd, isStart, isPath, isTraversed, isWall } =
              tile;
            return (
              <Tile
                key={tileIndex}
                row={tile.row}
                col={tile.col}
                isEnd={isEnd}
                isStart={isStart}
                isPath={isPath}
                isTraversed={isTraversed}
                isWall={isWall}
                handleMouseDown={() => handleMouseDown(row, col)}
                handleMouseUp={() => handleMouseUp(row, col)}
                handleMouseEnter={() => handleMouseEnter(row, col)}
                handleMouseClick={()=>handleMouseClick(row,col)}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
}
