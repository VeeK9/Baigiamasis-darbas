import { useContext, useState } from "react";
import styled from "styled-components";
import PostsContext from "../../contexts/PostsContext";
import SmallPost from "../organisms/SmallPost";
import { useLocation, useParams } from "react-router-dom";
import CommentsContext from "../../contexts/CommentsContext";

const StyledSection = styled.section`
  background-color: #f3f3f3;
  display: flex;
  flex-direction: column;
  gap: 15px;
  align-items: center;
  > * {
    max-width: 950px;
  }

  > div {
    display: flex;
    align-items: center;
    gap: 10px;
    > div.roundSlider {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 34px;
    width: 60px;

    /* The slider */
    .slider {
      position: absolute;
      cursor: pointer;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: #ccc;
      -webkit-transition: .4s;
      transition: .4s;
    }

    .slider:before {
      position: absolute;
      content: "";
      height: 26px;
      width: 26px;
      left: 4px;
      bottom: 4px;
      background-color: white;
      -webkit-transition: .4s;
      transition: .4s;
    }

    input:checked + .slider {
      background-color: gray;
    }

    input:focus + .slider {
      box-shadow: 0 0 1px gray;
    }

    input:checked + .slider:before {
      transform: translateX(26px);
    }
    .slider.round {
      border-radius: 34px;
    }

    .slider.round:before {
      border-radius: 50%;
    }
  }
}
`

const Posts = ({pathname}) => {

  const {posts} = useContext(PostsContext);
  const {comments} = useContext(CommentsContext);
  const [commentedPosts, setCommentedPosts] = useState(posts)
  
  let category;
  if(pathname){
    category = pathname.slice(7);
  }

  const handleChange = (e) => {
    if(e.target.checked){
      setCommentedPosts(posts.filter(post => comments.some(com => com.postId === post.id)))
    } else {
      setCommentedPosts(posts)
    }
  }

  return (
    <StyledSection>
      <h1>{category!=='all' ? 'Category: ' + category.slice(0,1).toUpperCase().concat(category.slice(1)) : 'All Posts'}</h1>
      <div>
        <span>Only show posts with comments:</span>
        <div className="roundSlider">
          <form>
            <label className="switch">
              <input
                type="checkbox" 
                name="switch" id="switch"
                onClick={(e) => handleChange(e)}
              />
              <span className="slider round"></span>
            </label>
          </form>
        </div>
      </div>
      {
        commentedPosts ?
          category!=='all' ? 
          commentedPosts.filter(post => 
            post.category.some(cat => 
              cat === category)).map(post => 
                <SmallPost
                  key={post.id}
                  post={post} 
                />)
          : commentedPosts.map(post =>
            <SmallPost 
              key={post.id}
              post={post}
            />
          )
        : null
      }
      {/* <div>
        <select name="" id="">
          <option value="">labas</option>
          <option value="">labas</option>
          <option value="">labas</option>
          <option value="">labas</option>
          <option value="">labas</option>
        </select>
      </div> */}
    </StyledSection>
  );
}
 
export default Posts;