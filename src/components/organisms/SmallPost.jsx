import { useContext } from "react";
import styled from "styled-components";
import UsersContext from "../../contexts/UsersContext";
import { useNavigate, Link } from "react-router-dom";
import PostsContext, {PostsActionTypes} from "../../contexts/PostsContext";
import CommentsContext from "../../contexts/CommentsContext";

const StyledDiv = styled.div`
  background-color: white;
  border: 1px solid lightgray;
  display: grid;
  grid-template-columns: ${props => props.$image ? '1fr 1fr 1fr 1fr' : '2fr 1fr 1fr'};
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 150px;
  padding: 10px 30px;
  box-sizing: border-box;
  > h3 {
    justify-self: flex-start;
  }
  .userImg {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    border: 1px solid lightgray;
  }
  > img {
    height: 130px;
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
    <StyledDiv $image={post.image}>
      <img src={author?.avatar} alt={author?.username} className="userImg"/>
      <h3>
        <Link to={`/post/${post.id}`} onClick={() => setCurrentPost(post)}>
          {post.title}
        </Link>
      </h3>
      {/* {
        post.image && <img src={post.image} alt="" />
      } */}
      <div>
        <p>by: <span>{author?.username}</span></p>
        <p>{post.timestamp}</p>
      </div>
      <div>{comments.filter(com => com.postId === post.id).length} comments</div>
      <div className="rating">
        <span className="bi bi-hand-thumbs-up" onClick={() => handleThumbsUp()}></span>
        <span>{rating}</span>
        <span className="bi bi-hand-thumbs-down" onClick={() => handleThumbsDown()}></span>
      </div>
      {
        post.edited &&
        <i>Edited</i>
      }
    </StyledDiv>
  );
}
 
export default SmallPost;