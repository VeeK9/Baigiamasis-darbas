import styled from "styled-components";
import logo from "../../media/logo.png";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import UsersContext from "../../contexts/UsersContext";

const StyledHeader = styled.header`
  position: fixed;
  z-index: 1;
  width: 100%;
  height: 200px;
  padding: 10px 20px;
  border-bottom: 1px solid lightgray;
  background-color: white;

  display: flex;
  justify-content: center;
  align-items: center;
  > div {
    width: 20%;
    display: flex;
    align-items: center;
  }
  .logo {
    height: 70%;
    > img {
      height: 100%;
      margin: 0 auto;
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
      right: calc(50% - 260px);
      width: fit-content;
      display: flex;
      visibility: hidden;
      transform: translateY(-10px);
      opacity: 0;
      transition: 0.3s;
      flex-direction: column;
      align-items: center;
      > ul {
        list-style-type: none;
        padding: 0;
        margin: 0;
        display: flex;
        gap: 10px;
      }
    }
  }
  .userSide {
    height: 100%;
    justify-content: flex-end;
    gap: 10px;
    > a {
      display: flex;
      align-items: center;
      gap: 10px;
      > span {
      font-size: 1.2rem;
      }
    }
  }
  a.posts:hover {
    > div {
      visibility: visible;
      opacity: 1;
      transform: translateY(0);
    }
  }
  .userBtns {
    gap: 10px;
    justify-content: flex-end;
  }
  a, li.link {
    padding: 10px 20px;
    border-radius: 10px;
    color: black;
    text-decoration: none;
    border: 1px solid lightgray;
    transition: 0.2s;
    cursor: pointer;
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
  const navigate = useNavigate();

  return (
    <StyledHeader>
      <div className="logo">
        <img src={logo} alt="Stride buddies forum" />
      </div>
      <nav>
        <NavLink to='/'>Home</NavLink>
        <NavLink to='/posts/all' className='posts'>Posts
        <div>
          <ul>
            <li className="link" onClick={() => navigate('/')}>Runners</li>
            <li className="link" onClick={() => navigate('/')}>Races</li>
            <li className="link" onClick={() => navigate('/')}>Shoes</li>
            <li className="link" onClick={() => navigate('/')}>Watches</li>
            <li className="link" onClick={() => navigate('/')}>Random stuff</li>
          </ul>
        </div>
        </NavLink>
        <NavLink to='/members'>Members</NavLink>
      </nav>
      {
        currentUser ? 
        <div className="userSide">
          <Link onClick={() => navigate('/user')}>Settings <span className="bi bi-gear-wide-connected"/></Link>
          <Link onClick={() => setCurrentUser(false)}>Log out <span className="bi bi-box-arrow-right"/></Link>
        </div> :
        <div className="userBtns">
          <NavLink to='/register'>Register</NavLink>
          <NavLink to='/login'>Log in</NavLink>
        </div>
      }
    </StyledHeader>
  );
}
 
export default Header;