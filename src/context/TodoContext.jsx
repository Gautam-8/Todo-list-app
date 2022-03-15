import { nanoid } from "nanoid";
import { createContext, useRef, useState } from "react";

export const TodoContext = createContext({ list :[] });

export const TodoContextProvider = ({children}) => {

    const[list ,setList] = useState([]);

    const [completed , setCompleted] = useState([]);

    const handleList = (task) => {
        const id = nanoid(7);
        task.id = id;
        setList([...list , task]);
       
    }

    console.log(list);

    const handleDelete = (id) => {
             let mylist = list.filter((e)=> e.id !== id);
             setList(mylist)        
    }

    const handleStatus = (id) => {
        
        let mylist = list.map((e) => {
            if(e.id === id) {
                //console.log(e);
                e.status = !e.status;
                return e;
            }
            return e;
        })
       let com = mylist.filter((e) => !e.status);
       setList(com);
       let pend = mylist.filter((e) => e.status);
       setCompleted([...completed , ...pend]);
    }

    return(
        <TodoContext.Provider 
        value={{list , handleList , handleDelete , handleStatus , completed}}>
            {children}</TodoContext.Provider>
    )
}