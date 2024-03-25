import { createContext } from "react";

const PostsContext = createContext();

const PostsProvider = ({children}) => {
  return (
    <PostsContext.Provider
      value={{

      }}
    >
      {children}
    </PostsContext.Provider>
  );
}
 
export {PostsProvider};
export default PostsContext;