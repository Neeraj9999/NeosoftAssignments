import React, { useContext, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import styled from "styled-components";
import { TodoContext } from "../App";
import { validate } from "../Common";
export default function Login() {
  const { user, setUser } = useContext(TodoContext);
  const [state, setstate] = useState({
    email: "",
    password: "",
    errors: {
      email: "",
      password: "",
    },
  });
  const [userNotFound, setuserNotFound] = useState(-1);
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
  const submitHandler = (ev) => {
    ev.preventDefault();
    const { email, password } = state;
    if (
      email &&
      state.errors.email === "" &&
      password &&
      state.errors.password === ""
    ) {
      let data = localStorage.getItem("user");
      if (data) {
        let parsedData = JSON.parse(data);
        let foundUserIndex = parsedData.findIndex(
          (usr) => usr.email === email && usr.password === password
        );
        if (foundUserIndex > -1) {
          setUser({
            ...parsedData[foundUserIndex],
            auth: true,
            userIndex: foundUserIndex,
          });
          setuserNotFound(1);
        } else {
          setuserNotFound(0);
        }
      } else {
        setuserNotFound(0);
      }
    }
  };
  return userNotFound === 1 ? (
    <Redirect to="/" />
  ) : (
    <Container>
      {userNotFound === 0 && <h4>Use not found</h4>}
      <form onSubmit={submitHandler}>
        <div className="logo">
          <img src="" alt="" />
        </div>
        <div className="inputGroup">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            value={state.email}
            name="email"
            id="email"
            onChange={changeHandler}
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
          />
          {state.errors.password.length > 0 && <p>{state.errors.password}</p>}
        </div>
        <button>Login</button>
        <Link to="/register">Register</Link>
        <p className="fp">Forgot Password</p>
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
    min-width: 350px;
    min-height: 550px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 50px;
    .logo{
        border: 1px solid red;
    height: 80px;
    width: 80px;
    position: absolute;
    top: 60px;
    border-radius: 50%;
    overflow:hidden;
        img{
            height:100%;
            width:100%;
        }
    }
    .inputGroup {
      height: 50px;
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
        font-size: 20px;
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
        position: absolute;
        width: 80%;
        height: 40px;
        font-size: 22px;
        border: none;
        bottom: 103px;
    }
    .fp{
        position:absolute;
        bottom:10px;
        right:10px;
    }
    a{
        position: absolute;
        bottom: 10px;
        text-decoration: none;
        left: 10px;
        font-size: 20px;
        color: white;
        font-weight: bolder;
    }
    }
  }
`;
