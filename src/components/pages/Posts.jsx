import { useContext } from "react";
import styled from "styled-components";
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

const Posts = () => {

  const {posts} = useContext(PostsContext);

  return (
    <StyledSection>
      <h1>All Posts</h1>
      {
        posts ?
        posts.map(post =>
          <SmallPost 
            key={post.id}
            post={post}
          />
        )
        : null
      }
    </StyledSection>
  );
}
 
export default Posts;