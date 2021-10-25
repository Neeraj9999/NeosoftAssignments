import React, { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./Components/Home";
import ProtectedRoutes from "./ProtectedRoutes";
import Register from "./Components/Register";
export const TodoContext = React.createContext();

function App() {
  const [user, setUser] = useState({});
  const userDet = JSON.stringify(user);
  let data = localStorage.getItem("user");

  useEffect(() => {
    let data = localStorage.getItem("user");
    if (data) {
      let parsedData = JSON.parse(data);
      let index = parsedData.findIndex((usr) => usr.auth);
      setUser(parsedData[index] || {});
    }
  }, []);

  useEffect(() => {
    if (Object.keys(JSON.parse(userDet)).length > 0) {
      if (data) {
        let tmp = JSON.parse(data);
        localStorage.setItem(
          "user",
          JSON.stringify([
            ...tmp.slice(0, user.userIndex),
            user,
            ...tmp.slice(user.userIndex + 1),
          ])
        );
      } else {
        localStorage.setItem("user", JSON.stringify([JSON.parse(userDet)]));
      }
    }
  }, [userDet]);

  return (
    <BrowserRouter>
      <TodoContext.Provider value={{ user, setUser }}>
        <Switch>
          <ProtectedRoutes exact path="/" component={Home} />
          <Route path="/register" component={Register} />
          <Route path="*" component={Home} />
        </Switch>
      </TodoContext.Provider>
    </BrowserRouter>
  );
}

export default App;
