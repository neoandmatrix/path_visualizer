import { useContext } from "react"
import { SpeedContext } from "../context/SpeedContext"

export const useSpeed = () => {
    const context = useContext(SpeedContext)

    if (!context) {
        throw new Error('useSpeed context can only be used inside useSpeedProvider')
    }

    return context
}