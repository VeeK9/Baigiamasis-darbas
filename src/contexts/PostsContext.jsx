import { createContext, useContext, useEffect, useReducer, useState } from "react";
import UsersContext from "./UsersContext";

const PostsContext = createContext();

export const PostsActionTypes = {
  GET_ALL: "fetches all posts on inital load",
  NEW_POST: "creates a new post"
}

const reducer = (state, action) => {
  switch (action.type) {
    case PostsActionTypes.GET_ALL:
      return action.data;

    case PostsActionTypes.NEW_POST:
      fetch(`http://localhost:8080/posts`, {
        method: "POST",
        headers: {
          "Content-Type":"application/json"
        },
        body: JSON.stringify(action.data)
      })
      return [...state, action.data];
      
    default:
      console.error(`No such action: ${action.type}`);
      return state;
  }
}

const PostsProvider = ({children}) => {

  const [posts, setPosts] = useReducer(reducer, []);
  const [userPosts, setUserPosts] = useState([]);
  const {currentUser} = useContext(UsersContext);

  useEffect(() => {
    fetch(`http://localhost:8080/posts`)
      .then(res => res.json())
      .then(data => setPosts({
        type: PostsActionTypes.GET_ALL,
        data: data
      }))
  }, []);

  useEffect(() => {
    fetch(`http://localhost:8080/posts`)
      .then(res => res.json())
      .then(data => setUserPosts(data.filter(post => post.authorId === currentUser.id).toReversed()))
  }, [currentUser, posts]);

  return (
    <PostsContext.Provider
      value={{
        posts,
        setPosts,
        userPosts
      }}
    >
      {children}
    </PostsContext.Provider>
  );
}
 
export {PostsProvider};
export default PostsContext;