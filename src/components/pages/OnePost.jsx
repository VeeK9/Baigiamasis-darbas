import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import UsersContext from "../../contexts/UsersContext";
import PostsContext, {PostsActionTypes} from "../../contexts/PostsContext";
import CommentsContext, { CommentsActionTypes } from "../../contexts/CommentsContext";
import { useFormik } from "formik";
import * as Yup from "yup";
import { v4 as uuid } from "uuid";
import Comment from "../UI/Comment";

const StyledSection = styled.section`
  background-color: #f3f3f3;
  display: flex;
  flex-direction: column;
  gap: 15px;
  align-items: center;
  padding-block: 30px;
  > * {
    max-width: 950px;
  }
  /* > .post {
    background-color: white;
    border: 1px solid lightgray;
    border-radius: 10px;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 10px 30px;
    box-sizing: border-box;
    > h3 {
      justify-self: flex-start;
    }
    > img {
      width: 100%;
      aspect-ratio: 3 / 1;
      object-fit: cover;
      border: 1px solid lightgray;
      border-radius: 10px;
    }
    > div {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      > p {
        margin: 0;
        > span {
          text-decoration: underline;
          font-weight: 700;
        }
      }
    }
  } */
  
  .comments {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 15px;
    margin-top: 30px;
    width: 100%;
  }
  .addComment {
    width: 100%;
    > form {
      display: flex;
      flex-direction: column;
      gap: 10px;
      > textarea {
        height: 7lh;
        resize: none;
        border: 1px solid lightgray;
        border-radius: 10px;
        padding: 7px 10px;
      }
      > p {
        text-align: center;
        color: red;
        margin: 0;
      }
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
  }
  .post {
    background-color: white;
    border: 1px solid lightgray;
    border-radius: 10px;
    position: relative;
    display: grid;
    /* gap: 10px; */
    grid-template: 80px 70px auto 50px / 1.5fr 2fr 2fr 1fr;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 10px 30px 20px;
    margin-top: 30px;

    > .postBody {
      grid-area: 3 / 1 / 4 / -1;
      text-align: center;
      > img {
        width: 90%;
        border-radius: 10px;
        margin-top: 10px;
      }
      > p {
        text-align: justify;
        line-height: 1.5;
        width: 90%;
        margin: 20px auto;
      }
    }

    .userImg {
      width: 170px;
      height: 170px;
      border-radius: 50%;
      border: 1px solid lightgray;
      grid-row-start: span 2;
      align-self: start;
      transform: translate(0, -30px);
    }

    > img {
      height: 130px;
      aspect-ratio: 3 / 1;
      object-fit: cover;
      border: 1px solid lightgray;
      border-radius: 10px;
    }
    .author_date {
      display: flex;
      flex-direction: column;
      grid-area: 1 / 2 / 3 / -1;
      > h1 {
        margin-bottom: 10px;
      }
      > p {
        margin: 2px;
        > span {
          text-decoration: underline;
          font-weight: 700;
        }
      }
    }
    .comments {
      grid-area: 4 / 1 / -1 / 4;
      display: flex;
      flex-direction: row;
      align-items: start;
      gap: 5px;
      > p {
        margin: 0;
      }
      .bi {
        font-size: 1.3rem;
      }
    }
    .rating {
      grid-area: 3 / 4 / -1 / -1;
      place-self: end;
    }
    .categories {
      position: absolute;
      display: flex;
      gap: 20px;
      top: -20px;
      right: 50px;
      > div {
        padding: 10px 20px;
        background-color: white;
        border-radius: 5px;
        border: 1px solid lightgray;
      }
    }
  }
`

const OnePost = () => {

  const { id } = useParams();
  const {currentUser, users} = useContext(UsersContext);
  const {posts, currentPost, setPosts} = useContext(PostsContext);
  const {comments, setComments, currentPostComments, setCurrentPostComments} = useContext(CommentsContext);
  const navigate = useNavigate();

  const post = posts?.find(post => post.id === id);
  const author = users.find(user => user.id === post?.authorId);
  const rating = post.votes?.plus.length - post.votes?.minus.length;

  const [isEditing, setIsEditing] = useState(false);

  useEffect(()=>{
    setCurrentPostComments(comments.filter(com => com.postId === currentPost.id))
  },[currentPost, comments])
  
  const handleThumbsUp = () => {
    if(currentUser){
      if(post.votes.plus.every(vote => vote !== currentUser.id)){
        setPosts({
          type: PostsActionTypes.VOTE,
          data: post.id,
          user: currentUser.id,
          vote: 'plus'
        })
      }
    }
  }
  
  const handleThumbsDown = () => {
    if(currentUser){
      if(post.votes.minus.every(vote => vote !== currentUser.id)){
        setPosts({
          type: PostsActionTypes.VOTE,
          data: post.id,
          user: currentUser.id,
          vote: 'minus'
        })
      }
    }
  }


  const formik = useFormik({
    initialValues: {
      text: ""
    },
    validationSchema: Yup.object({
      text: Yup.string().trim()
        .min(8, 'Minimum length of 8 symbols')
        .max(500, 'Maximum length of 500 symbols')
        .required('This field is required')
    }),
    onSubmit: values => {
      const newComment = {
        text: values.text,
        id: uuid(),
        userId: currentUser.id,
        timestamp: Date().slice(0,21).toString(),
        postId: id,
        edited: false,
        votes: {
          plus:[],
          minus:[]
        }
      }
      setComments({
        type: CommentsActionTypes.NEW_COMMENT,
        comment: newComment
      })
      formik.resetForm();
    }
  })

  const editFormik = useFormik({
    initialValues: {
      ...post,
      edited: true
    },
    validationSchema: Yup.object({
      title: Yup.string().trim().required('Please enter a title for your post'),
      image: Yup.string().url('Must be a valid URL').trim(),
      post: Yup.string().trim().required("what's the post about?"),
      category: Yup.array().required('Must choose one'),
    }),
    onSubmit: values => {
      console.log(values)
      const editedPost = {
        ...values,
        edited: true,
        category: values.category
      }
      console.log(editedPost)
      setPosts({
        type: PostsActionTypes.EDIT,
        data: editedPost
      })
      setIsEditing(false)
      editFormik.resetForm()
    }
  })

  const handleDeletePost = () => {
    setComments({
      type: CommentsActionTypes.DELETE_POST,
      postId: post.id
    })
    setPosts({
      type: PostsActionTypes.DELETE,
      postId: post.id
    })
    navigate('/posts/all');
  }

  return (
    <StyledSection>
      {
        posts.length && post ?
        <>
          {
            isEditing ?
            <form onSubmit={editFormik.handleSubmit}>
            <div>
              <input 
                type="text"
                name="title" id="title"
                placeholder="Create your post title"
                value={editFormik.values.title}
                onBlur={editFormik.handleBlur}
                onChange={editFormik.handleChange}
              />
            </div>
              {editFormik.touched.title && editFormik.errors.title && <span>{editFormik.errors.title}</span>}
            <div>
              <textarea 
                type="post"
                name="post" id="post"
                placeholder="Write whatever is on your mind."
                value={editFormik.values.post}
                onChange={editFormik.handleChange}
                onBlur={editFormik.handleBlur}
              />
            </div>
              {editFormik.touched.post && editFormik.errors.post && <span>{editFormik.errors.post}</span>}
            {/* <div>
              <div>
                <label htmlFor="">Runners</label>
                <input
                    type="checkbox"
                    name='category' 
                    value='runners'
                    onChange={editFormik.handleChange}
                  />
              </div>
              <div>
                <label htmlFor="">Races</label>
                <input
                    type="checkbox"
                    name='category' 
                    value='races'
                    onChange={editFormik.handleChange}
                  />
              </div>
              <div>
                <label htmlFor="">Shoes</label>
                <input
                    type="checkbox"
                    name='category' 
                    value='shoes'
                    onChange={editFormik.handleChange}
                  />
              </div>
              <div>
                <label htmlFor="">Gear</label>
                <input
                    type="checkbox"
                    name='category' 
                    value='gear'
                    onChange={editFormik.handleChange}
                  />
              </div>
              <div>
                <label htmlFor="">Miscellaneous</label>
                <input
                    type="checkbox"
                    name='category' 
                    value='miscellaneous'
                    onChange={editFormik.handleChange}
                  />
              </div>
              {editFormik.touched.category && editFormik.errors.category && <span>{editFormik.errors.category}</span>}
            </div> */}
            <div>
              <input 
                type="url"
                name="image" id="image"
                placeholder="Paste the URL of a photo you want to attach. "
                value={editFormik.values.image}
                onChange={editFormik.handleChange}
                onBlur={editFormik.handleBlur}
              />
            </div>
              {editFormik.touched.image && editFormik.errors.image && <span>{editFormik.errors.image}</span>}
            <input type="submit" value="Post"/>
            </form>


            : 
            <div className="post">
              <div className="categories">
                {post.category.map((cat, idx) => <div key={idx}>{cat}</div>)}
              </div>
              <img src={author?.avatar} alt={author?.username} className="userImg"/>
              <div className="postBody">
                <p>{post.post}</p>
                {
                  post.image &&
                  <img src={post.image} alt={post.title} />
                }
              </div>
              <div className="author_date">
                <h1>{post.title}</h1>
                <p>{post.timestamp}
                  {post.edited && <i> - Edited</i>}
                </p>
                <p>By: <span>{author?.username}</span></p>
              </div>
              <div className="comments">
                {
                  comments.filter(com => com.postId === post.id).length ?
                  <>
                    <p>{comments.filter(com => com.postId === post.id).length} comments</p>
                    <span className="bi bi-chat-right-text"/>
                  </>
                  : <p>No comments</p>
                }
              </div>
              <div className="rating">
                <span className="bi bi-hand-thumbs-up-fill" onClick={() => handleThumbsUp()}></span>
                <span>{rating}</span>
                <span className="bi bi-hand-thumbs-down-fill" onClick={() => handleThumbsDown()}></span>
              </div>
            </div>
          }
          <div className="addComment">
            {
              currentUser &&
              <form onSubmit={formik.handleSubmit}>
                <textarea
                  name="text" id="text"  
                  placeholder="Enter your comment..."
                  value={formik.values.text}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.text && formik.errors.text && <p>{formik.errors.text}</p>}
                <input type="submit" value="Add Comment"/>
              </form>
            }
          </div>
          <div className="comments">
            {
              currentPostComments.map((comment, idx) => 
                <Comment
                  key={idx}
                  comment={comment}
                  postId={post.id}
                />
              )
            }
          </div>
        </>
        : null
      }
    </StyledSection>
  );
}
 
export default OnePost;