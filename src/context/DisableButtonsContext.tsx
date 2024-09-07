import { createContext, ReactNode, useState } from "react";

export interface DisableButtonsInterface{
    isDisabled : boolean,
    setIsDisabled : (disabled : boolean) => void
}

export const DisableButtonsContext = createContext<DisableButtonsInterface | undefined>(
  undefined
);

export const DisableButtonsProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [isDisabled, setIsDisabled] = useState<boolean>(false);

  return (
    <DisableButtonsContext.Provider
      value={{
        isDisabled,setIsDisabled
      }}
    >
      {children}
    </DisableButtonsContext.Provider>
  );
};
