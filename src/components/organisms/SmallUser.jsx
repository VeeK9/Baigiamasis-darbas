import { useContext } from "react";
import styled from "styled-components";
import PostsContext from "../../contexts/PostsContext";
import UsersContext from "../../contexts/UsersContext";
import { useNavigate } from "react-router-dom";

const StyledDiv = styled.div`
  background-color: white;
  border: 1px solid lightgray;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 300px;
  height: 300px;
  justify-content: center;
  align-items: center;
  > * {
    margin: 0;
  }
  img {
    border-radius: 50%;
    aspect-ratio: 1 / 1;
    object-fit: cover;
    border: 1px solid lightgray;
    width: 60%;
    cursor: pointer;
  }
`

const SmallUser = ({user}) => {

  const {posts} = useContext(PostsContext);
  const {currentUser} = useContext(UsersContext);
  const navigate = useNavigate();

  return (
    <StyledDiv>
      <h2>{user.username}</h2>
      {
        currentUser &&
        <h4>{user.name}</h4>
      }
      <img src={user.avatar} alt={user.username} onClick={() => navigate(`/members/${user.username}`)}/>
      <p>Posts: {posts && posts.filter(post => post.authorId === user.id).length}</p>
    </StyledDiv>
  );
}
 
export default SmallUser;