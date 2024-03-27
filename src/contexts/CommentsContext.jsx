import { createContext, useContext, useEffect, useReducer, useState } from "react";
import UsersContext from "./UsersContext";
import PostsContext from "./PostsContext";

const CommentsContext = createContext();

export const CommentsActionTypes = {
  GET_ALL: "fetches all comments on inital load",
  NEW_COMMENT: "creates a new comment"
}

const reducer = (state, action) => {
  switch (action.type) {
    case CommentsActionTypes.GET_ALL:
      return action.data;

    case CommentsActionTypes.NEW_COMMENT:
      fetch(`http://localhost:8080/comments`, {
        method: "POST",
        headers: {
          "Content-Type":"application/json"
        },
        body: JSON.stringify(action.comment)
      })
      return [...state, action.comment];
      
    case CommentsActionTypes.DELETE:
      fetch(`http://localhost:8080/comments/${action.commentId}`, { method: "DELETE"});
      return state.filter(comment => comment.id !== action.commentId);

    default:
      console.error(`No such action: ${action.type}`);
      return state;
  }
}

const CommentsProvider = ({children}) => {

  const [comments, setComments] = useReducer(reducer, []);
  const [currentPostComments, setCurrentPostComments] = useState([]);
  const {currentUser} = useContext(UsersContext);
  const {posts, currentPost} = useContext(PostsContext);

  useEffect(() => {
    fetch(`http://localhost:8080/comments`)
      .then(res => res.json())
      .then(data => setComments({
        type: CommentsActionTypes.GET_ALL,
        data: data.toReversed()
      }))
  }, []);

  useEffect(() => {
    fetch(`http://localhost:8080/comments`)
      .then(res => res.json())
      .then(data => setCurrentPostComments(data.filter(comment => comment.postId === currentPost.id).toReversed()))
  }, [currentPost, comments]);

  console.log(currentPostComments)

  return (
    <CommentsContext.Provider
      value={{
        comments,
        setComments,
        currentPostComments
      }}
    >
      {children}
    </CommentsContext.Provider>
  );
}
 
export {CommentsProvider};
export default CommentsContext;