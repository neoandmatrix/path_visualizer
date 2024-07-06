import { useRef } from "react"
import { Grid } from "./components/Grid"
import { PathfindingProvider } from "./context/PathfindingContext"
import { SpeedProvider } from "./context/SpeedContext"
import { TileProvider } from "./context/TileContext"
import { Nav } from "./components/Nav"

function App() {

  const isVisualizationRunningRef = useRef<boolean>(false);

  return (
    <>
        <SpeedProvider>
        <TileProvider>
          <PathfindingProvider>
            <div className="h-screen w-screen flex flex-col">
              <Nav isVisualizationRunningRef = {isVisualizationRunningRef}/>
              <Grid isVisualizationRunningRef = {isVisualizationRunningRef} />
            </div>
          </PathfindingProvider>
        </TileProvider>
        </SpeedProvider>
    </>
  )
}

export default App
