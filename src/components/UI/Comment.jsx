import { useContext, useState } from "react";
import styled from "styled-components";
import UsersContext, { UsersActionTypes } from "../../contexts/UsersContext";
import CommentsContext, {CommentsActionTypes} from "../../contexts/CommentsContext";
import { useFormik } from "formik";
import * as Yup from "yup";

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

  const {users, currentUser, setUsers} = useContext(UsersContext);
  const {setComments} = useContext(CommentsContext);

  const author = users.find(user => user.id === comment.userId);
  const rating = comment.votes?.plus.length - comment.votes?.minus.length;

  const [isEditing, setIsEditing] = useState(false);

  const formik = useFormik({
    initialValues: {
      ...comment,
      edited: true
    },
    validationSchema: Yup.object({
      text: Yup.string().trim()
        .min(8, 'Minimum length of 8 symbols')
        .max(500, 'Maximum length of 500 symbols')
        .required('This field is required')
    }),
    onSubmit: values => {
      const editedComment = {
        text: values.text,
        edited: true,
        ...values
      }
      setComments({
        type: CommentsActionTypes.EDIT,
        comment: editedComment
      })
      setIsEditing(false)
    }
  })
  
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

  const handleDeleteComment = () => {
    setComments({
      type: CommentsActionTypes.DELETE,
      commentId: comment.id
    })
  }

  return (
    <StyledDiv>
      {
        isEditing ?
        <>
          <h4>Comment by <span>{author.username}</span>:</h4>
          <form onSubmit={formik.handleSubmit}>
            <textarea
              type="text"
              name="text" id="text"
              placeholder={comment.text}
              value={formik.values.text}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <input type="submit" value="Edit Comment"/>
            {
              formik.touched.text && formik.errors.text && <p>{formik.errors.text}</p>
            }
          </form>
        </>
          : users.length ?
          <>
            <h4>Comment by <span>{author.username}</span>:</h4>
            <p>{comment.text}</p>
            {
              currentUser.id === author.id &&
              <div>
                <button
                  className="editBtn"
                  onClick={()=>setIsEditing(true)}
                >Edit</button>
                <button
                  className="deleteBtn"
                  onClick={()=>handleDeleteComment()}
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