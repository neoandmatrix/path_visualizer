import { bfs } from "../lib/algorithms/pathfinding/bfs";
import { dfs } from "../lib/algorithms/pathfinding/dfs";
import { djkistra } from "../lib/algorithms/pathfinding/djkistra";
import { AlgorithmType, GridType, TileType } from "./types"

export const runPathFindingAlgorithm = ({
    algorithm,
    grid,
    startTile,
    endTile
}  : {
    algorithm : AlgorithmType,
    grid : GridType,
    startTile : TileType,
    endTile : TileType
}) => {
    switch (algorithm) {
        case 'BFS':
            return bfs(grid,startTile,endTile);
        case 'DFS':
            return dfs(grid,startTile,endTile);
        case 'DJISKSTRA':
            return djkistra(grid,startTile,endTile);      
    
        default:
            return bfs(grid,startTile,endTile);
    }
}