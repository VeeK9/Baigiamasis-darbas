import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useContext, useState } from "react";
import UsersContext, { UsersActionTypes } from "../../contexts/UsersContext";
import { useFormik } from "formik";
import * as Yup from "yup";
import {v4 as uuid} from "uuid";
import bcrypt from "bcryptjs";

const StyledDiv = styled.div`
  background-color: white;
  width: 700px;
  height: 800px;
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
    width: 80%;
    > div {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      gap: 20px;
      > label {
        width: calc(30% - 20px);
        text-align: end;
      }
      > input, textarea {
        padding: 5px 10px;
        border-radius: 10px;
        border: 1px solid lightgray;
        width: 70%;
      }
      > textarea {
        resize: none;
        height: 5lh;
        width: 70%;
      }
    }
    > input {
      width: 30%;
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
    text-align: center;
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

const Register = () => {

  const [sameNameError, setSameNameError] = useState(false);
  const {users, setUsers, setCurrentUser} = useContext(UsersContext);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues:{
      username: "",
      name:"",
      password:"",
      passwordConfirm:"",
      email:"",
      avatar:"",
      description:""
    },
    onSubmit: values => {
      if(users.find(user => user.username === values.username)){
        setSameNameError(true)
      } else {
        const newUser = {
          id: uuid(),
          role: "user",
          username: values.username,
          name: values.name,
          password: bcrypt.hashSync(values.password, 8),
          email: values.email,
          description: values.description ? values.description : "User did not provide any additional info about Himself/Herself",
          avatar: values.avatar ? values.avatar : "https://cdn.iconscout.com/icon/free/png-256/free-runner-3841050-3197118.png"
        }
        setUsers({
          type: UsersActionTypes.NEW_USER,
          data: newUser
        })
        setCurrentUser(newUser);
        navigate('/')
      }
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .min(3, 'Username must be at least 3 symbols.')
        .max(25, 'Username must be less than 25 symbols')
        .required('Username is required')
        .trim(),
      email: Yup.string()
        .email('Enter a valid email!')
        .required('Email is required')
        .trim(),
      name: Yup.string().trim().required('Please enter your real name'),
      avatar: Yup.string()
        .url('Must be a valid URL')
        .trim(),
      password: Yup.string()
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,25}$/,
          'Password must be between 8 and 25 symbols. It must include lowercase and uppercase letters, a number and a special symbol.'
        )
        .required('Required')
        .trim(),
      passwordConfirm: Yup.string()
        .oneOf([Yup.ref('password')], "Passwords don't match.")
        .required('Required'),
      description: Yup.string()
    })
  })

  return createPortal(
    <div
      className="modal"
      onClick={() => navigate('/')}
    >
      <StyledDiv
        className="registerModal"
        onClick={(e) => {
          e.stopPropagation()
        }}
      >
        <h1>Register</h1>
        <form onSubmit={formik.handleSubmit}>
          <div>
            <label htmlFor="username">Username:</label>
            <input 
              type="text"
              name="username" id="username"
              placeholder="Create your username"
              value={formik.values.username}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
            />
          </div>
            {formik.touched.username && formik.errors.username && <p>{formik.errors.username}</p>}
          <div>
            <label htmlFor="email">Email:</label>
            <input 
              type="email"
              name="email" id="email"
              placeholder="email@email.com"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </div>
            {formik.touched.email && formik.errors.email && <p>{formik.errors.email}</p>}
          <div>
            <label htmlFor="name">Name:</label>
            <input 
              type="text"
              name="name" id="name"
              placeholder="Thomas Johnson"
              value={formik.values.name}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
            />
          </div>
            {formik.touched.name && formik.errors.name && <p>{formik.errors.name}</p>}
          <div>
            <label htmlFor="avatar">Avatar (optional):</label>
            <input 
              type="url"
              name="avatar" id="avatar"
              placeholder="Paste the URL of your profile picture"
              value={formik.values.avatar}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </div>
            {formik.touched.avatar && formik.errors.avatar && <p>{formik.errors.avatar}</p>}
          <div>
            <label htmlFor="description">Something about you (optional):</label>
            <textarea 
              type="url"
              name="description" id="description"
              placeholder="e.g. Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse accusantium, expedita, eos cupiditate cumque nam dolor minima nesciunt quis, neque iusto? Est minima itaque facilis!"
              value={formik.values.description}
              onChange={formik.handleChange}
            />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input 
              type="password"
              name="password" id="password"
              placeholder="********"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </div>
            {formik.touched.password && formik.errors.password && <p>{formik.errors.password}</p>}
          <div>
            <label htmlFor="passwordConfirm">Confirm Password:</label>
            <input 
              type="password"
              name="passwordConfirm" id="passwordConfirm"
              placeholder="********"
              value={formik.values.passwordConfirm}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </div>
            {formik.touched.passwordConfirm && formik.errors.passwordConfirm && <p>{formik.errors.passwordConfirm}</p>}
          <input type="submit" value="Register"/>
        </form>
        <span className="bi bi-x-circle" onClick={() => navigate('/')}></span>
        {
          sameNameError &&
          <p>Username is invalid</p>
        }
      </StyledDiv>
    </div>,
    document.querySelector('#portal')
  );
}
 
export default Register;