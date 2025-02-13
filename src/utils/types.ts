export type AlgorithmType = 'DJISKSTRA' | 'A_STAR' | 'BFS' | 'DFS';
export type MazeType = 'NONE' | 'BINARY_TREE' | 'RECURSIVE_DIVISION';
export type TileType = {
    row : number,
    col : number,
    isEnd : boolean,
    isWall : boolean,
    isPath : boolean,
    distance : number,
    isStart : boolean,
    parent : TileType | null,
    isTraversed : boolean
}

export interface MazeSelectType{
    name : string,
    value : MazeType
}
export type GridType = TileType[][]

export type SpeedType = 2 | 1 | 0.5

export interface SpeedSelectType {
    name : string,
    value : SpeedType
}

export interface AlgorithmSelectType{
    name : string,
    value : AlgorithmType
}