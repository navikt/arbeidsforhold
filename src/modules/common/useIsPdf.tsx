import React, { useContext } from "react";

const IsPdfContext = React.createContext<Boolean>(false);

export const useIsPdf = () => {
  const isPdf = useContext(IsPdfContext);
  return { isPdf: isPdf, IsPdfProvider: IsPdfContext.Provider };
};
