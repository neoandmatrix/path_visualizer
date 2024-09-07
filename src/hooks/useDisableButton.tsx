import { useContext } from "react";
import { DisableButtonsContext } from "../context/DisableButtonsContext";

export const useDisableButtons = () => {
  const context = useContext(DisableButtonsContext);

  if (!context) {
    throw new Error(
      "useDisableButtons must be used within PathFindingProvider"
    );
  }

  return context;
};
