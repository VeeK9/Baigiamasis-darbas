import { createContext } from "react";

const UsersContext = createContext();

const UsersProvider = ({children}) => {
  return (
    <UsersContext.Provider
      value={{

      }}
    >
      {children}
    </UsersContext.Provider>
  );
}
 
export {UsersProvider};
export default UsersContext;