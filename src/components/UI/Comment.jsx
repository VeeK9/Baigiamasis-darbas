import { useContext, useState } from "react";
import styled from "styled-components";
import UsersContext, { UsersActionTypes } from "../../contexts/UsersContext";
import CommentsContext, {CommentsActionTypes} from "../../contexts/CommentsContext";
import { useFormik } from "formik";
import * as Yup from "yup";

const StyledDiv = styled.div`
  padding: 15px;
  border: 1px solid lightgray;
  border-radius: 10px;
  background-color: white;
  display: grid;
  grid-template: 1fr auto 1fr / auto 2fr 2fr;
  gap: 10px;
  row-gap: 20px;
  align-items: center;
  width: 100%;
  position: relative;
  > img {
    grid-row-start: span 3;
    place-self: start;
    margin: 0 10px 10px 0;
    width: 100px;
    height: 100px;
    border-radius: 50%;
    border: 1px solid lightgray;
    object-fit: cover;
  }
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
  .commentText {
    grid-column-start: span 2;
    /* text-align: center; */
  }
  .rating{
    place-self: end;
  }
  .btns {
    align-self: start;
    justify-self: end;
  }

  .editForm {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    grid-area: 1 / 1 / -1 / -1;
    > textarea {
      width: 100%;
      height: 5lh;
      resize: none;
      border: 1px solid lightgray;
      border-radius: 5px;
      padding: 7px 10px;
    }
    > div {
      display: flex;
      gap: 15px;
      > input {
        width: auto;
        align-self: center;
        border: 1px solid lightgray;
        border-radius: 10px;
        padding: 5px 20px;
        background-color: white;
        cursor: pointer;
        transition: 200ms;
        &:hover {
          background-color: lightgray;
        }
      }
    }
    > p {
      margin: 0;
      color: red;
    }
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
        <form onSubmit={formik.handleSubmit} className="editForm">
            <textarea
              type="text"
              name="text" id="text"
              placeholder={comment.text}
              value={formik.values.text}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.text && formik.errors.text && <p>{formik.errors.text}</p>}
            <div>
              <input type="submit" value="Edit Comment"/>
              <input type="button" value="Cancel"
                onClick={() => {
                  setIsEditing(false)
                  formik.resetForm()  
                }}/>
            </div>
        </form>
          : users.length ?
          <>
            <img src={author.avatar} alt={author.username} />
            <h4>Comment by <span>{author.username}</span>: </h4>
            {
              currentUser.id === author.id &&
              <div className="btns">
                <i
                  className="bi bi-pencil-fill"
                  onClick={()=>setIsEditing(true)}
                />
                <i
                  className="bi bi-trash-fill"
                  onClick={()=>handleDeleteComment()}
                />
              </div>
            }
            <p className="commentText">{comment.text}</p>
            <p>{comment.timestamp} 
            {
              comment.edited &&
              <i> - Edited</i>
            }
            </p>
            <div className="rating">
              <span className="bi bi-hand-thumbs-up-fill" onClick={() => handleThumbsUp()}></span>
              <span>{rating}</span>
              <span className="bi bi-hand-thumbs-down-fill" onClick={() => handleThumbsDown()}></span>
            </div>
          </> :
          null
      }
    </StyledDiv>
  );
}
 
export default Comment;