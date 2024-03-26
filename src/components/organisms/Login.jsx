import { useContext, useState } from "react";
import { createPortal } from "react-dom";
import { useNavigate, Link } from "react-router-dom";
import UsersContext from "../../contexts/UsersContext";
import styled from "styled-components";
import { useFormik } from "formik";
import * as Yup from "yup";
import bcrypt from "bcryptjs";

const StyledDiv = styled.div`
  background-color: white;
  width: 500px;
  height: 400px;
  border-radius: 10px;
  box-shadow: 0 0 20px 5px black;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  > h1 {
    margin-top: 0;
    margin-bottom: 2rem;
    font-size: 2.5rem;
  }
  > form {
    display: flex;
    flex-direction: column;
    gap: 10px;
    > div {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 10px;
      > input {
        padding: 5px 10px;
        border-radius: 10px;
        border: 1px solid lightgray;
      }
    }
    > input {
      width: 50%;
      align-self: center;
      margin-top: 1rem;
      padding: 5px 10px;
      border-radius: 10px;
      border: 1px solid lightgray;
      background-color: white;
      transition: 0.3s;
      cursor: pointer;
      &:hover {
        background-color: lightgray;
      }
    }
  }
  p {
    margin: 0;
    color: red;
    align-self: center;
  }
  p:last-child {
    margin-top: 10px;
  }
  .bi-x-circle {
    position: absolute;
    font-size: 2rem;
    top: 20px;
    right: 20px;
    cursor: pointer;
    color: black;
    border-radius: 50%;
  }
`

const Login = () => {

  const navigate = useNavigate();
  const { users, setCurrentUser } = useContext(UsersContext);
  const [failedLogin, setFailedLogin] = useState(false);

  const formik = useFormik({
    initialValues:{
      username: "",
      password: ""
    },
    onSubmit:(values) => {
      // const loggingUser = users.find(user => user.username === values.username && bcrypt.compareSync(values.password, user.password));
      const loggingUser = users.find(user => user.username === values.username && user.password === values.password);

      if(loggingUser){
        setCurrentUser(loggingUser);
        navigate('/');
      } else {
        setFailedLogin(true)
      }
    },
    validationSchema: Yup.object({
      username: Yup.string().trim().required('This field is required'),
      password: Yup.string().trim().required('This field is required')
    })
  })

  return createPortal(
    <div
      className="modal"
      onClick={() => navigate('/')}
    >
      <StyledDiv
        className="loginModal"
        onClick={(e) => {
          e.stopPropagation()
        }}>
        <h1>Log In</h1>
        <form onSubmit={formik.handleSubmit}>
          <div>
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              name="username"
              id="username"
              placeholder="Enter Your username"
              value={formik.values.username}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </div>
          {formik.touched.username && formik.errors.username && <p>{formik.errors.username}</p>}
          <div>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="********"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </div>
          {formik.touched.password && formik.errors.password && <p>{formik.errors.password}</p>}
          <input type="submit"  value="Log In"/>
        </form>
        {
          failedLogin &&
          <p>Wrong username and/or password</p>
        }
        <span className="bi bi-x-circle" onClick={() => navigate('/')}></span>
      </StyledDiv>
    </div>,
    document.querySelector('#portal')
  );
}
 
export default Login;