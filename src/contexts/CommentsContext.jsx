import { createContext, useContext, useEffect, useReducer, useState } from "react";
import UsersContext from "./UsersContext";
import PostsContext from "./PostsContext";

const CommentsContext = createContext();

export const CommentsActionTypes = {
  GET_ALL: "fetches all comments on inital load",
  NEW_COMMENT: "creates a new comment",
  DELETE: "deletes a specific comment",
  VOTE: "Thumbs up/down on a specific comment",
  EDIT: "Edit a specific comment",
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
      });
      return [action.comment, ...state];
      
    case CommentsActionTypes.DELETE:
      fetch(`http://localhost:8080/comments/${action.commentId}`, {method: "DELETE"});
      return state.filter(com => com.id !== action.commentId);

    case CommentsActionTypes.VOTE:
      const oldComment = state.find(com => com.id === action.data);
      let newVotes
      if(action.vote === 'plus'){
        newVotes = {plus:[...oldComment.votes.plus, action.user], minus:oldComment.votes.minus.filter(minus => minus !== action.user)}
      } else if(action.vote === 'minus'){
        newVotes = {plus:oldComment.votes.plus.filter(minus => minus !== action.user), minus:[...oldComment.votes.minus, action.user]}
      }
      fetch(`http://localhost:8080/comments/${action.data}`, {
        method: "PATCH",
        headers: {
          "Content-Type":"application/json"
        },
        body: JSON.stringify({...oldComment, votes:newVotes})
      })
      
      return state.map(com => {
        if(com.id === action.data){
          return {
            ...com,
            votes: newVotes
          } 
        } else {
          return com;
        }})

    case CommentsActionTypes.EDIT:
      fetch(`http://localhost:8080/comments/${action.comment.id}`, {
        method: "PUT",
        headers: {
          "Content-Type":"application/json"
        },
        body: JSON.stringify(action.comment)
      })
      
      return state.map(com => {
        if(com.id === action.comment.id){
          return action.comment
        } else {
          return com;
        }})

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

  return (
    <CommentsContext.Provider
      value={{
        comments,
        setComments,
        currentPostComments,
        setCurrentPostComments
      }}
    >
      {children}
    </CommentsContext.Provider>
  );
}
 
export {CommentsProvider};
export default CommentsContext;