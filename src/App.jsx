import './App.css';
import Home from './components/pages/Home';
import Posts from './components/pages/Posts';
import AddPost from './components/pages/AddPost';
import UserPosts from './components/pages/UserPosts';
import OnePost from './components/pages/OnePost';
import ErrorPage from './components/pages/ErrorPage';
import Users from './components/pages/Users';
import OneUser from './components/pages/OneUser';
import Footer from './components/organisms/Footer';
import Header from './components/organisms/Header';
import Login from './components/organisms/Login';
import Register from './components/organisms/Register';
import UserAside from './components/organisms/UserAside';
import { Route, Routes, useNavigate, Navigate, useLocation } from "react-router-dom";
import { useContext } from 'react';
import UsersContext from './contexts/UsersContext';
import styled from 'styled-components';

const StyledSection = styled.section`
min-height: calc(100vh - 400px);
display: flex;
position: relative;
top: 200px;
gap: 10px;
box-sizing: border-box;
background-color: #f3f3f3;
justify-content: ${props => props.$loggedIn ? 'unset' : 'center'};
width: ${props => props.$loggedIn ? 'calc(100vw - 300px)' : '100%'};

  >aside+* {
    position: relative;
    box-sizing: border-box;
    left: ${props => props.$loggedIn ? '290px' : '0'};
  }
  > section {
    width: ${props => props.loogedIn ? 'calc(100vw - 300px)' : '100%'};
  }
  `

const App = () => {

  const { currentUser } = useContext(UsersContext);
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <>
      <Header />
      <StyledSection $loggedIn={currentUser}>
        {
          currentUser &&
          <UserAside />
        }
        <Routes>
          <Route index element={<Home />} />

          <Route path="/posts" element={<Posts pathname={location.pathname}/>}>
            <Route path=":category" element={<Posts />} />
          </Route>

          <Route path='post/:id' element={<OnePost />}/>
          <Route path='/login' element={<><Home /><Login /></>} />
          <Route path='/register' element={<><Home /><Register /></>} />

          <Route path='/members'>
            <Route path='all' element={<Users />} />
            <Route path=':username' element={<OneUser pathname={location.pathname}/>} />
          </Route>
            
          <Route path=':user'>
            <Route path="posts" element={currentUser ? <UserPosts /> : <Navigate to='/login' />}/>
            <Route path="new_post" element={currentUser ? <AddPost /> : <Navigate to='/login' />} />
            {/* <Route path=':username' element={loggedInUser ? <UserPage /> : <Navigate to='/user/login' />} /> */}
            {/* <Route path='admin' element={loggedInUser.role === 'admin' ? <Admin /> : <Navigate to='/user/login' />} /> */}
          </Route>
          <Route path='*' element={<ErrorPage />} />
        </Routes>
      </StyledSection>
      <Footer />
    </>
  );
}

export default App;
