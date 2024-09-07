import { useRef } from "react";
import { Grid } from "./components/Grid";
import { PathfindingProvider } from "./context/PathfindingContext";
import { SpeedProvider } from "./context/SpeedContext";
import { TileProvider } from "./context/TileContext";
import { Nav } from "./components/Nav";
import { DisableButtonsProvider } from "./context/DisableButtonsContext";

function App() {
  const isVisualizationRunningRef = useRef<boolean>(false);
  const isChangeStartSelectedRef = useRef<boolean>(false);
  const isChangeEndSelectedRef = useRef<boolean>(false);

  return (
    <>
      <SpeedProvider>
        <TileProvider>
          <PathfindingProvider>
            <DisableButtonsProvider>
              <div className="h-screen w-screen flex flex-col">
                <Nav
                  isVisualizationRunningRef={isVisualizationRunningRef}
                  isChangeStartSelectedRef={isChangeStartSelectedRef}
                  isChangeEndSelectedRef={isChangeEndSelectedRef}
                />
                <Grid
                  isVisualizationRunningRef={isVisualizationRunningRef}
                  isChangeStartSelectedRef={isChangeStartSelectedRef}
                  isChangeEndSelectedRef={isChangeEndSelectedRef}
                />
              </div>
            </DisableButtonsProvider>
          </PathfindingProvider>
        </TileProvider>
      </SpeedProvider>
    </>
  );
}

export default App;
