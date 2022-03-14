import { createContext, useState } from "react";

export const TodoContext = createContext({ list :[] });

export const TodoContextProvider = ({children}) => {

    const[list ,setList] = useState([]);

    const handleList = (task) => {
        setList([...list , task]);
    }

    return(
        <TodoContext.Provider value={{list , handleList}}>{children}</TodoContext.Provider>
    )
}