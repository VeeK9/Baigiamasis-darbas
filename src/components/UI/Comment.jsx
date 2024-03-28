import { useContext } from "react";
import styled from "styled-components";
import UsersContext, { UsersActionTypes } from "../../contexts/UsersContext";
import CommentsContext, {CommentsActionTypes} from "../../contexts/CommentsContext";

const StyledDiv = styled.div`
  padding: 10px 20px;
  border: 1px solid lightgray;
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
  position: relative;
  > h4 {
    margin: 0;
    > span {
      text-decoration: underline;
    }
  }
  > p {
    text-align: justify;
    margin: 0;
  }
  .rating {
    display: flex;
    flex-direction: row;
    > .bi {
      cursor: pointer;
    }
    > .bi-hand-thumbs-up {
      color: green;
    }
    > .bi-hand-thumbs-down {
      color: red;
    }
  }
`

const Comment = ({comment, postId}) => {

  const {users, currentUser, setUsers} = useContext(UsersContext);
  const {setComments} = useContext(CommentsContext);

  const author = users.find(user => user.id === comment.userId);
  const rating = comment.votes?.plus.length - comment.votes?.minus.length;
  
  const handleThumbsUp = () => {
    if(currentUser){
      if(comment.votes.plus.every(vote => vote !== currentUser.id)){
        setComments({
          type: CommentsActionTypes.VOTE,
          data: comment.id,
          user: currentUser.id,
          vote: 'plus'
        })
      }
    }
  }
  
  const handleThumbsDown = () => {
    if(currentUser){
      if(comment.votes.minus.every(vote => vote !== currentUser.id)){
        setComments({
          type: CommentsActionTypes.VOTE,
          data: comment.id,
          user: currentUser.id,
          vote: 'minus'
        })
      }
    }
  }

  return (
    <StyledDiv>
      {
        users.length ?
        <>
          <h4>Comment by <span>{author.username}</span>:</h4>
          <p>{comment.text}</p>
          {
            currentUser.id === author.id &&
            <div>
              <button
                className="editBtn"
                onClick={()=>setComments({
                  type: CommentsActionTypes.EDIT,
                  commentId: comment.id
                })}
              >Edit</button>
              <button
                className="deleteBtn"
                onClick={()=>setComments({
                  type: CommentsActionTypes.DELETE,
                  commentId: comment.id
                })}
              >Delete</button>
            </div>
          }
          <p>{comment.timestamp}</p>
          <div className="rating">
            <span className="bi bi-hand-thumbs-up" onClick={() => handleThumbsUp()}></span>
            <span>{rating}</span>
            <span className="bi bi-hand-thumbs-down" onClick={() => handleThumbsDown()}></span>
          </div>
          {
            comment.edited &&
            <i>Edited</i>
          }
        </> :
        null
      }
    </StyledDiv>
  );
}
 
export default Comment;