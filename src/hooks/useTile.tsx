import { useContext } from "react"
import { TileContext } from "../context/TileContext"

export const useTile = () => {
    const tile = useContext(TileContext);

    if (!tile) {
        throw new Error('useTile must be used withing TileProvider')
    }

    return tile
}