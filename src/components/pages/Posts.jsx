import { useContext, useState } from "react";
import styled from "styled-components";
import PostsContext from "../../contexts/PostsContext";
import SmallPost from "../organisms/SmallPost";
import CommentsContext from "../../contexts/CommentsContext";

const StyledSection = styled.section`
  background-color: #f3f3f3;
  display: flex;
  flex-direction: column;
  gap: 50px;
  align-items: center;
  position: relative;
  > * {
    max-width: 950px;
  }

  > div.sorting {
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    top: 20px;
    right: 20px;
    > div {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 10px;
      > form > select {
        border: 1px solid lightgray;
        border-radius: 6px;
        padding: 2px 4px;
      }

    }
  }
  > div > div {
    > div.roundSlider {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 17px;
    width: 50px;

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
      height: 13px;
      width: 13px;
      left: 2px;
      bottom: 2px;
      background-color: white;
      transition: .4s;
    }

    input:checked + .slider {
      background-color: gray;
    }

    input:focus + .slider {
      box-shadow: 0 0 1px gray;
    }

    input:checked + .slider:before {
      transform: translateX(32px);
    }
    .slider.round {
      border-radius: 17px;
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
  const [sortedPosts, setSortedPosts] = useState(posts)
  
  let category;
  if(!pathname.slice(7)){
    category = 'all'
  } else {
    category = pathname.slice(7);
  }

  const handleFilterChange = (e) => {
    if(e.target.checked){
      setSortedPosts(posts.filter(post => comments.some(com => com.postId === post.id)))
    } else {
      setSortedPosts(posts)
    }
  }
  
  const handleSortChange = (e) => {
    if(e.target.value === 'comments'){
      const postsWithComments = posts.map(post => {return {...post, comments: comments.filter(com => com.postId === post.id)}});
      const sorted = postsWithComments.sort((a, b) => b.comments.length - a.comments.length)
      setSortedPosts(sorted)
    } else if(e.target.value === 'rating'){
      const postsWithRating = posts.map(post => {return {...post, rating: post.votes.plus.length - post.votes.minus.length}})
      const sorted = postsWithRating.sort((a, b) => b.rating - a.rating)
      setSortedPosts(sorted)
    } else {
      setSortedPosts(posts)
    }
  }

  return (
    <StyledSection>
      <h1>{category!=='all' ? 'Category: ' + category.slice(0,1).toUpperCase().concat(category.slice(1)) : 'All Posts'}</h1>
      <div className="sorting">
        <div>
          <span>Only posts with comments:</span>
          <div className="roundSlider">
            <form>
              <label className="switch">
                <input
                  type="checkbox" 
                  name="switch" id="switch"
                  onClick={(e) => handleFilterChange(e)}
                />
                <span className="slider round"></span>
              </label>
            </form>
          </div>
        </div>
        <div>
          <span>Now showing:</span>
          <form>
            <select name="sort" id="sort" onChange={(e)=>handleSortChange(e)}>
              <option value="newest">From newest</option>
              <option value="comments">Most comments</option>
              <option value="rating">Best rating</option>
            </select>
          </form>
        </div>
      </div>
      {
        sortedPosts ?
          category!=='all' ? 
          sortedPosts.filter(post => 
            post.category.some(cat => 
              cat === category)).map(post => 
                <SmallPost
                  key={post.id}
                  post={post} 
                />)
          : sortedPosts.map(post =>
            <SmallPost 
              key={post.id}
              post={post}
            />
          )
        : <p>Nothing to see here...</p>
      }
    </StyledSection>
  );
}
 
export default Posts;