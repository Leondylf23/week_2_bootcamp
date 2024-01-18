import { createContext, useContext, useState } from "react";

const MainProvider = createContext();

function MainContext({children}) {
    const [mainData, setMainData] = useState(null);
    const [page, setPage] = useState(null);

    return(
        <MainProvider.Provider value={{mainData, setMainData, page, setPage}}>
            {children}
        </MainProvider.Provider>
    );
}

function useMainContext() {
    const context = useContext(MainProvider);

    if(!context) {
        console.error("The context is not in MainContext Element");
        return;
    }

    return context;
}

export {MainContext, useMainContext};