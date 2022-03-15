import { nanoid } from "nanoid";
import { createContext, useState } from "react";

export const TodoContext = createContext({ list: [] });

export const TodoContextProvider = ({ children }) => {
  const [list, setList] = useState([]);

  const [completed, setCompleted] = useState([]);
  const [uncompleted, setUncompeted] = useState([]);

  const handleBoth = (all) => {
    let uncomp = all.filter((e) => !e.status);
    setUncompeted(uncomp);
    let comp = all.filter((e) => e.status);
    setCompleted(comp);
  };

  const handleList = (task) => {
    let found = false;

    list.forEach((e) => {
      if (e.task === task.task) {
        found = true;
      }
    });

    if (found) {
      alert("Similar task is already added");
    } else {
      const id = nanoid(7);
      task.id = id;
      let mylist = [...list, task];
      setList(mylist);
      handleBoth(mylist);
    }
  };

  console.log(list);

  const handleDelete = (id) => {
    let mylist = list.filter((e) => e.id !== id);
    setList(mylist);
    handleBoth(mylist);
  };

  const handleStatus = (id) => {
    let mylist = list.map((e) => {
      if (e.id === id) {
        //console.log(e);
        e.status = !e.status;
        return e;
      }
      return e;
    });
    setList(mylist);
    handleBoth(mylist);
  };

  const handleClear = () => {
    let mylist = list.filter((e) => !e.status);
    setList(mylist);
    handleBoth(mylist);
  };

  return (
    <TodoContext.Provider
      value={{
        list,
        handleList,
        handleDelete,
        handleStatus,
        completed,
        uncompleted,
        handleClear,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};
