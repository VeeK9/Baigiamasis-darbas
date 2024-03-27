import { useContext } from "react";
import styled from "styled-components";
import PostsContext from "../../contexts/PostsContext";
import UsersContext from "../../contexts/UsersContext";

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
  > img {
    border-radius: 50%;
    aspect-ratio: 1 / 1;
    object-fit: cover;
    border: 1px solid lightgray;
    width: 60%;
  }
`

const OneUser = ({pathname}) => {

  const {posts} = useContext(PostsContext);
  const {users, currentUser} = useContext(UsersContext);

  const user = users.find(user => user.username === pathname.slice(9))

  return (
    <StyledSection>
      <h2>{user.username}</h2>
      {
        currentUser &&
        <p>{user.name}</p>
      }
      <img src={user.avatar} alt={user.username} />
      <p>Posts: {posts && posts.filter(post => post.authorId === user.id).length}</p>
    </StyledSection>
  );
}
 
export default OneUser;