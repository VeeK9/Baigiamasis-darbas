import styled from "styled-components";
import logo from "../../media/logo.png";
import { NavLink, Link } from "react-router-dom";
import { useContext } from "react";
import UsersContext from "../../contexts/UsersContext";

const StyledHeader = styled.header`
  height: 200px;
  /* background-color: green; */
  padding: 10px 20px;

  display: flex;
  justify-content: center;
  align-items: center;
  .logo {
    height: 70%;
    > img {
      height: 100%;
    }
  }
  > nav {
    display: flex;
    justify-content: center;
    flex-grow: 1;
    gap: 10px;
    position: relative;
    .posts > div {
      position: absolute;
      top: calc(100% + 10px);
      right: 0;
      left: 0;
      display: flex;
      visibility: hidden;
      opacity: 0;
      transition: 0.3s;
      flex-direction: column;
      align-items: center;
      > ul {
        list-style-type: none;
        padding: 0;
        display: flex;
        gap: 10px;
      }
    }
  }
  a.posts:hover {
    > div {
      visibility: visible;
      opacity: 1;
    }
  }
  .userBtns {
    display: flex;
    gap: 10px;
  }
  a {
    padding: 10px 20px;
    border-radius: 10px;
    color: black;
    text-decoration: none;
    border: 1px solid lightgray;
    transition: 200ms;
    &:hover {
      background-color: lightgray;
    }
    &.active {
      background-color: black;
      color: white;
    }
  }
`

const Header = () => {

  const { currentUser, setCurrentUser } = useContext(UsersContext);

  return (
    <StyledHeader>
      <div className="logo">
        <img src={logo} alt="Stride buddies forum" />
      </div>
      <nav>
        <NavLink to='/'>Home</NavLink>
        <NavLink to='/posts' className='posts'>Posts
        <div>
          <ul>
            <li><Link to='/posts/filter'>Runners</Link></li>
            <li><Link to='/posts/filter'>Races</Link></li>
            <li><Link to='/posts/filter'>Shoes</Link></li>
            <li><Link to='/posts/filter'>Watches</Link></li>
            <li><Link to='/posts/filter'>Random stuff</Link></li>
          </ul>
        </div>
        </NavLink>
        <NavLink to='/members'>Members</NavLink>
      </nav>
      {
        currentUser ? 
        <div>
          <Link to='/user/:username'><img src={currentUser.avatar} alt={currentUser.username} /></Link>
          <Link onClick={() => setCurrentUser(false)}>Log out</Link>
        </div> :
        <div className="userBtns">
          <NavLink to='user/register'>Register</NavLink>
          <NavLink to='user/login'>Log in</NavLink>
        </div>
      }
    </StyledHeader>
  );
}
 
export default Header;