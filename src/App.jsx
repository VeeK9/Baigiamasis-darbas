import './App.css';
import Home from './components/pages/Home';
import Posts from './components/pages/Posts';
import AddPost from './components/pages/AddPost';
import UserPosts from './components/pages/UserPosts';
import OnePost from './components/pages/OnePost';
import ErrorPage from './components/pages/ErrorPage';
import Footer from './components/organisms/Footer';
import Header from './components/organisms/Header';
import Login from './components/organisms/Login';
import Register from './components/organisms/Register';
import UserAside from './components/organisms/UserAside';
import { Route, Routes, useNavigate } from "react-router-dom";

const App = () => {

  const navigate = useNavigate();

  return (
    <>
      <Header />
      <UserAside />
      <Routes>
        <Route index element={<Home />} />
        <Route path="/posts" element={<Posts />} >
          <Route path=":id" element={<OnePost />} />
        </Route>
        <Route path=":author/posts" element={<UserPosts />} />
        <Route path=":author/add_new_post" element={<AddPost />} />
        <Route path='/user'>
          {/* <Route path=':username' element={loggedInUser ? <UserPage /> : <Navigate to='/user/login' />} /> */}
          {/* <Route path='admin' element={loggedInUser.role === 'admin' ? <Admin /> : <Navigate to='/user/login' />} /> */}
          <Route path='login' element={<><Home /><Login /></>} />
          <Route path='register' element={<><Home /><Register /></>} />
        </Route>
        <Route path='*' element={<ErrorPage />} />
      </Routes>
      {/* <Routes> */}
      {/* </Routes> */}
      <Footer />
    </>
  );
}

export default App;
