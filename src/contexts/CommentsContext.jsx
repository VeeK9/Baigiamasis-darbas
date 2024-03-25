import { createContext } from "react";

const CommentsContext = createContext();

const CommentsProvider = ({children}) => {
  return (
    <CommentsContext.Provider
      value={{

      }}
    >
      {children}
    </CommentsContext.Provider>
  );
}
 
export {CommentsProvider};
export default CommentsContext;