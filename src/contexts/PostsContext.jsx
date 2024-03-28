import { createContext, useContext, useEffect, useReducer, useState } from "react";
import UsersContext from "./UsersContext";

const PostsContext = createContext();

export const PostsActionTypes = {
  GET_ALL: "fetches all posts on inital load",
  NEW_POST: "creates a new post",
  DELETE: "deletes a specific post",
  VOTE: "Thumbs up/down on a specific post",
  EDIT: "Edit a specific post"
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
      return [action.data, ...state];
      
      case PostsActionTypes.DELETE:
        fetch(`http://localhost:8080/posts/${action.postId}`, {method: "DELETE"});
        return state.filter(post => post.id !== action.postId);
  
      case PostsActionTypes.VOTE:
        const oldPost = state.find(post => post.id === action.data);
        let newVotes
        if(action.vote === 'plus'){
          newVotes = {plus:[...oldPost.votes.plus, action.user], minus:oldPost.votes.minus.filter(minus => minus !== action.user)}
        } else if(action.vote === 'minus'){
          newVotes = {plus:oldPost.votes.plus.filter(minus => minus !== action.user), minus:[...oldPost.votes.minus, action.user]}
        }
        fetch(`http://localhost:8080/posts/${action.data}`, {
          method: "PATCH",
          headers: {
            "Content-Type":"application/json"
          },
          body: JSON.stringify({...oldPost, votes:newVotes})
        })
        
        return state.map(post => {
          if(post.id === action.data){
            return {
              ...post,
              votes: newVotes
            } 
          } else {
            return post;
          }})

    case PostsActionTypes.EDIT:
      fetch(`http://localhost:8080/posts/${action.data.id}`, {
        method: "PUT",
        headers: {
          "Content-Type":"application/json"
        },
        body: JSON.stringify(action.data)
      })
      
      return state.map(post => {
        if(post.id === action.data.id){
          return action.data
        } else {
          return post;
        }})
      
    default:
      console.error(`No such action: ${action.type}`);
      return state;
  }
}

const PostsProvider = ({children}) => {

  const [posts, setPosts] = useReducer(reducer, []);
  const [userPosts, setUserPosts] = useState('');
  const [currentPost, setCurrentPost] = useState([]);
  const {currentUser} = useContext(UsersContext);

  useEffect(() => {
    fetch(`http://localhost:8080/posts`)
      .then(res => res.json())
      .then(data => setPosts({
        type: PostsActionTypes.GET_ALL,
        data: data.toReversed()
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
        userPosts,
        setCurrentPost,
        currentPost
      }}
    >
      {children}
    </PostsContext.Provider>
  );
}
 
export {PostsProvider};
export default PostsContext;