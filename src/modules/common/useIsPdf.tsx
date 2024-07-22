import { useContext } from 'react';

const IsPdfContext = React.createContext<boolean>(false);

export const useIsPdf = () => {
    const isPdf = useContext(IsPdfContext);
    return { isPdf: isPdf, IsPdfProvider: IsPdfContext.Provider };
};
