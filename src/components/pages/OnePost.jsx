import { useContext, useEffect } from "react";
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
  > .post {
    background-color: white;
    border: 1px solid lightgray;
    /* display: grid;
    grid-template-columns: ${props => props.$image ? '1fr 1fr 1fr' : '2fr 1fr'}; */
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

  useEffect(()=>{
    setCurrentPostComments(comments.filter(com => com.postId === currentPost.id))
  },[currentPost, comments])


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

  const handleEditPost = () => {
    setPosts({
      type: PostsActionTypes.EDIT,
      postId: post.id
    })
  }

  const handleDeletePost = () => {
    setPosts({
      type: PostsActionTypes.DELETE,
      postId: post.id
    })
    navigate(-1);
  }

  return (
    <StyledSection>
      {
        posts.length && post ?
        <>
          <div className="post">
            <p>by: {author?.username}</p>
            <h1>{post.title}</h1>
            <p>{post.post}</p>
            {post.image && <img src={post.image} alt="" />}
          </div>
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
                <input type="submit" value="Add Comment"/>
                {
                  formik.touched.text && formik.errors.text && <p>{formik.errors.text}</p>
                }
              </form>
            }
          </div>
          <div className="comments">
            {
              currentPostComments.map(comment => 
                <Comment
                  key={comment.id}
                  comment={comment}
                  postId={post.id}
                />
              )
            }
          </div>
          {
            currentUser.id === author.id &&
            <div>
              <button
                className="editBtn"
                onClick={()=> handleEditPost()}
              >Edit</button>
              <button
                className="deleteBtn"
                onClick={() => handleDeletePost()}
              >Delete</button>
            </div>
          }
        </>
        : null
      }
    </StyledSection>
  );
}
 
export default OnePost;