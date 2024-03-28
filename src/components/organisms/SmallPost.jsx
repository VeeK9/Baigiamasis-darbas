import { useContext } from "react";
import styled from "styled-components";
import UsersContext from "../../contexts/UsersContext";
import { useNavigate, Link } from "react-router-dom";
import PostsContext, {PostsActionTypes} from "../../contexts/PostsContext";
import CommentsContext from "../../contexts/CommentsContext";

const StyledDiv = styled.div`
  background-color: white;
  border: 1px solid lightgray;
  border-radius: 10px;
  position: relative;
  display: grid;
  grid-template: repeat(3, 50px) / 1.5fr 2fr 2fr 1fr;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 10px 30px;

  > h2 {
    grid-area: 2 / 2 / 3 / -1;
    text-align: center;
    > a {
      color: black;
      text-decoration: none;
      cursor: pointer;
    }
  }

  .userImg {
    width: 170px;
    height: 170px;
    border-radius: 50%;
    border: 1px solid lightgray;
    grid-row-start: span 3;
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
    > p {
      margin: 2px;
      > span {
        text-decoration: underline;
        font-weight: 700;
      }
    }
  }
  .comments {
    grid-area: 3 / 2 / 4 / 3;
    display: flex;
    align-items: flex-start;
    gap: 5px;
    align-self: end;
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
`

const SmallPost = ({post}) => {

  const {users, currentUser} = useContext(UsersContext);
  const {setCurrentPost, setPosts} = useContext(PostsContext);
  const {comments, currentPostComments, setCurrentPostComments} = useContext(CommentsContext);
  const navigate = useNavigate();

  const author = users.find(user => user.id === post.authorId)
  const rating = post.votes?.plus.length - post.votes?.minus.length;
  
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

  return (
    <StyledDiv>
      <div className="categories">
        {
          post.category.map((cat, idx) => <div key={idx}>{cat}</div>)
        }
      </div>
      <img src={author?.avatar} alt={author?.username} className="userImg"/>
      <h2>
        <Link to={`/post/${post.id}`} onClick={() => setCurrentPost(post)}>
          {post.title}
        </Link>
      </h2>
      <div className="author_date">
        <p>{post.timestamp}
          {
            post.edited &&
            <i> - Edited</i>
          }
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
    </StyledDiv>
  );
}
 
export default SmallPost;