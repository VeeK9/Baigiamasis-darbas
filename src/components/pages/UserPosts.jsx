import styled from "styled-components";
import { useContext } from "react";
import PostsContext from "../../contexts/PostsContext";
import SmallPost from "../organisms/SmallPost";

const StyledSection = styled.section`
  background-color: #f3f3f3;
  display: flex;
  flex-direction: column;
  gap: 15px;
  align-items: center;
  > * {
    max-width: 950px;
  }
`

const UserPosts = () => {

  const {userPosts} = useContext(PostsContext);

  return (
    <StyledSection>
      <h1>My Posts</h1>
      {
        userPosts.length > 0 ? userPosts.map(post =>
          <SmallPost 
            key={post.id}
            post={post}
          />
        ) :
        <h3>You haven't posted anything just yet.</h3>
      }
    </StyledSection>
  );
}
 
export default UserPosts;