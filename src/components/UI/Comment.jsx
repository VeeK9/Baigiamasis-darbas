import { useContext } from "react";
import styled from "styled-components";
import UsersContext from "../../contexts/UsersContext";
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
`

const Comment = ({comment, postId}) => {

  const {users, currentUser} = useContext(UsersContext);
  const {setComments} = useContext(CommentsContext);

  const author = users.find(user => user.id === comment.userId);

  return (
    <StyledDiv>
      {
        users.length ?
        <>
          <h4>Comment by <span>{author.username}</span>:</h4>
          <p>{comment.text}</p>
          {
            currentUser.id === author.id &&
            <button
              className="deleteBtn"
              onClick={()=>setComments({
                type: CommentsActionTypes.DELETE,
                commentId: comment.id
              })}
            >Delete</button>
          }
        </> :
        null
      }
    </StyledDiv>
  );
}
 
export default Comment;