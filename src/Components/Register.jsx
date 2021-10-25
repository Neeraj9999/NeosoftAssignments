import React, { useContext, useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import styled from "styled-components";
import { TodoContext } from "../App";
import { validate } from "../Common";

export default function Register(props) {
  const [state, setstate] = useState({
    fname: "Test",
    lname: "Test",
    username: "Test",
    email: "test@test.tt",
    password: "Test@123",
    confirmpassword: "Test@123",
    errors: {
      fname: "",
      lname: "",
      username: "",
      email: "",
      password: "",
      confirmpassword: "",
    },
  });
  const [revert, setRevert] = useState(false);
  const { user, setUser } = useContext(TodoContext);

  useEffect(() => {
    setRevert(user.auth);
  }, [JSON.stringify(user)]);

  useEffect(() => {
    if (state.password.length > 0 && state.password !== state.confirmpassword) {
      setstate({
        ...state,
        errors: {
          ...state.errors,
          confirmpassword: "Password didn't match !!.",
        },
      });
    }
  }, [state.confirmpassword]);

  const changeHandler = ({ target: { name, value } }) => {
    setstate({
      ...state,
      [name]: value,
      errors: {
        ...state.errors,
        [name]: validate(name, value),
      },
    });
  };

  const blurHandler = ({ target: { name, value } }) =>
    setstate({
      ...state,
      errors: {
        ...state.errors,
        [name]: validate(name, value),
      },
    });

  const submitHandler = (ev) => {
    ev.preventDefault();
    // setUser({ auth: true, ...userDetails, todoList: [] });
    addUser();
  };

  const addUser = () => {
    const { errors, confirmpassword, ...newUser } = state;
    let data = localStorage.getItem("user");
    if (data) {
      localStorage.setItem(
        "user",
        JSON.stringify([
          ...JSON.parse(data),
          { ...newUser, auth: false, todoList: [] },
        ])
      );
    } else {
      localStorage.setItem(
        "user",
        JSON.stringify([{ ...newUser, auth: false, todoList: [] }])
      );
    }
    setRevert(true);
  };

  return revert ? (
    <Redirect to="/" />
  ) : (
    <Container>
      <form onSubmit={submitHandler}>
        <div className="logo">
          <img src="" alt="" />
        </div>
        <div className="inputGroup">
          <label htmlFor="fname">First Name</label>
          <input
            type="text"
            value={state.fname}
            name="fname"
            id="fname"
            onChange={changeHandler}
            onBlur={blurHandler}
          />
          {state.errors.fname.length > 0 && <p>{state.errors.fname}</p>}
        </div>
        <div className="inputGroup">
          <label htmlFor="lname">Last Name</label>
          <input
            type="text"
            value={state.lname}
            name="lname"
            id="lname"
            onChange={changeHandler}
            onBlur={blurHandler}
          />
          {state.errors.lname.length > 0 && <p>{state.errors.lname}</p>}
        </div>
        <div className="inputGroup">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            value={state.username}
            name="username"
            id="username"
            onChange={changeHandler}
            onBlur={blurHandler}
          />
          {state.errors.username.length > 0 && <p>{state.errors.username}</p>}
        </div>
        <div className="inputGroup">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            value={state.email}
            name="email"
            id="email"
            onChange={changeHandler}
            onBlur={blurHandler}
          />
          {state.errors.email.length > 0 && <p>{state.errors.email}</p>}
        </div>
        <div className="inputGroup">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            value={state.password}
            name="password"
            id="password"
            onChange={changeHandler}
            onBlur={blurHandler}
          />
          {state.errors.password.length > 0 && <p>{state.errors.password}</p>}
        </div>
        <div className="inputGroup">
          <label htmlFor="confirmpassword">Confirm Password</label>
          <input
            type="password"
            disabled={state.errors.password.length > 0}
            value={state.confirmpassword}
            name="confirmpassword"
            id="confirmpassword"
            onChange={changeHandler}
            onBlur={blurHandler}
          />
          {state.errors.confirmpassword.length > 0 && (
            <p>{state.errors.confirmpassword}</p>
          )}
        </div>
        <button>Register</button>
      </form>
    </Container>
  );
}
const Container = styled.div`
  height: 100vh;
  width: 100vw;
  background-color: grey;
  display: grid;
  grid-auto-flow: column;
  place-items: center;
  form {
    position: relative;
    border: 1px solid white;
    padding: 12px;
    padding-top:80px;
    min-width: 350px;
    min-height: 570px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 50px;
    .logo{
        background:red;
    height: 80px;
    width: 80px;
    position: absolute;
    top: -35px;
    border-radius: 50%;
    overflow:hidden;
        img{
            height:100%;
            width:100%;
        }
    }
    .inputGroup {
      height: 30px;
      width: 90%;
      display: grid;
      position: relative;
      label {
        position: absolute;
        height: 20px;
        width: 100%;
        top: -28px;
      }
      input {
        height: 100%;
        font-size: 18px;
        outline: none;
        border: none;
        border-bottom: 2px solid white;
        background: none;
      }

      p {
        font-size: 15px;
        position: absolute;
        bottom: -20px;
        right: 0;
        height: 20px;
        color: yellow;
      }
    }
    button {
        // position: absolute;
        width: 80%;
        height: 40px;
        font-size: 22px;
        border: none;
        bottom: 2%;//20px;
    }
    }
  }
`;
