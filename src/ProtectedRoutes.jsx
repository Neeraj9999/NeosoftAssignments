import React, { useContext } from "react";
import { Route } from "react-router";
import { TodoContext } from "./App";
import Login from "./Components/Login";

export default function ProtectedRoutes({ component: Component, ...rest }) {
  const { user } = useContext(TodoContext);
  return (
    <Route
      {...rest}
      render={(props) => (user.auth ? <Component {...props} /> : <Login />)}
    />
  );
}
