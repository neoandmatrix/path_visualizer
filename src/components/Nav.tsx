import { MutableRefObject, useState } from "react";
import { usePathFinding } from "../hooks/usePathFinding";
import { useTile } from "../hooks/useTile";
import {
  EXTENDED_SLEEP_TIME,
  MAZES,
  PATHFINDING_ALGORITHMS,
  SLEEP_TIME,
  SPEEDS,
} from "../utils/constants";
import { resetGrid } from "../utils/resetGrid";
import { AlgorithmType, MazeType, SpeedType } from "../utils/types";
import { Select } from "./Select";
import { runMazeAlgorithm } from "../utils/runMazeAlgorithm";
import { useSpeed } from "../hooks/useSpeed";
import { PlayButton } from "./PlayButton";
import { runPathFindingAlgorithm } from "../utils/runPathFindingAlgorithm";
import { animatePath } from "../utils/animatePath";
import { ChangeStartOrEndPositionButton } from "./SelectButton";
import { selectStart } from "../utils/selectStart";
import { selectEnd } from "../utils/selectEnd";

export function Nav({
  isVisualizationRunningRef,
  isChangeStartSelectedRef,
  isChangeEndSelectedRef,
}: {
  isVisualizationRunningRef: MutableRefObject<boolean>;
  isChangeStartSelectedRef: MutableRefObject<boolean>;
  isChangeEndSelectedRef: MutableRefObject<boolean>;
}) {
  const [isDisabled, setIsDisabled] = useState<boolean>(false);;
  const {
    grid,
    maze,
    setMaze,
    setGrid,
    isGraphVisualized,
    setIsGraphVisualized,
    algorithm,
    setAlgorithm,
  } = usePathFinding();
  const { startTile, endTile } = useTile();
  const { speed, setSpeed } = useSpeed();

  const handleRunVisualizer = () => {
    if (isGraphVisualized) {
      setIsGraphVisualized(false);
      resetGrid({ grid: grid.slice(), startTile, endTile });
    }
    const { traversedTiles, path } = runPathFindingAlgorithm({
      algorithm,
      grid,
      startTile,
      endTile,
    });

    animatePath(traversedTiles, path, startTile, endTile, speed);
    setIsDisabled(true);
    isVisualizationRunningRef.current = true;
    setTimeout(() => {
      const newGrid = grid.slice();
      setGrid(newGrid);
      setIsGraphVisualized(true);
      setIsDisabled(false);
      isVisualizationRunningRef.current = false;
    }, (SLEEP_TIME * (traversedTiles.length * SLEEP_TIME)) / 2 + EXTENDED_SLEEP_TIME * (path.length + 60) * SPEEDS.find((s) => s.value === speed)!.value);
  };

  const handleGenerateMaze = (maze: MazeType) => {
    if (maze === "NONE") {
      setMaze(maze);
      resetGrid({ grid, startTile, endTile });
      return;
    }
    setMaze(maze);
    setIsDisabled(true);
    runMazeAlgorithm({ maze, grid, startTile, endTile, setIsDisabled, speed });
    const newGrid = grid.slice();
    setGrid(newGrid);
    setIsGraphVisualized(false);
  };

  return (
    <div className="flex items-center justify-center min-h-[4.5rem] border-b shadow-gray-600 sm:px-5 px-0">
      <div className="flex items-center lg:justify-between justify-center w-full">
        <h1 className="lg:flex hidden w-[40%] text-2xl pl-1">
          Pathfinding Visualizer
        </h1>
        <div className="flex sm:items-end items-center justify-start sm:justify-between sm:flex-row flex-col sm:space-y-0 space-y-3 sm:py-0 py-4 sm:space-x-4">
          <Select
            label="Maze"
            value={maze}
            isDisabled={isDisabled}
            options={MAZES}
            onChange={(e) => {
              handleGenerateMaze(e.target.value as MazeType);
            }}
          ></Select>
          <Select
            label="Graph"
            value={algorithm}
            isDisabled={isDisabled}
            options={PATHFINDING_ALGORITHMS}
            onChange={(e) => {
              setAlgorithm(e.target.value as AlgorithmType);
            }}
          ></Select>

          <Select
            label="Speed"
            value={speed}
            isDisabled={isDisabled}
            options={SPEEDS}
            onChange={(e) => {
              setSpeed(parseInt(e.target.value) as SpeedType);
            }}
          ></Select>
          <ChangeStartOrEndPositionButton
            lable="Select Start"
            value="Select Start"
            isDisabled={isDisabled}
            onClick={async () => {
              await selectStart(
                grid,
                startTile,
                endTile,
                isChangeStartSelectedRef
              );
            }}
          ></ChangeStartOrEndPositionButton>
          <ChangeStartOrEndPositionButton
            lable="Select End"
            value="Change End"
            isDisabled={isDisabled}
            onClick={async () => {
              await selectEnd(grid, startTile, endTile, isChangeEndSelectedRef);
            }}
          ></ChangeStartOrEndPositionButton>
          <PlayButton
            isDisabled={isDisabled}
            isGraphVisualized={isGraphVisualized}
            handleRunVisualizer={handleRunVisualizer}
          ></PlayButton>
        </div>
      </div>
    </div>
  );
}
