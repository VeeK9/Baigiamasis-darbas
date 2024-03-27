import { useContext } from "react";
import styled from "styled-components";
import PostsContext from "../../contexts/PostsContext";
import SmallPost from "../organisms/SmallPost";
import { useLocation, useParams } from "react-router-dom";

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

const Posts = ({pathname}) => {

  const {posts} = useContext(PostsContext);
  
  let category;
  if(pathname){
    category = pathname.slice(7);
  }

  return (
    <StyledSection>
      <h1>{category!=='all' ? category.slice(0,1).toUpperCase().concat(category.slice(1)) : 'All Posts'}</h1>
      {
        posts ?
          category!=='all' ? 
          posts.filter(post => 
            post.category.some(cat => 
              cat === category)).map(post => 
                <SmallPost
                  key={post.id}
                  post={post} 
                />)
          : posts.map(post =>
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