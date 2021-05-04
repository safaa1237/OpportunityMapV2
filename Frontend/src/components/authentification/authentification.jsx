import React, { useState, useContext } from "react";
import { authenticationFromApi } from "../../services/auth";
import { UserContext } from "../../context/context";
import "./authentication.css";

function Authentication(props) {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const State = useContext(UserContext);

  const authenticationFunction = async (e) => {
    e.preventDefault();
    try {
      let result = await authenticationFromApi(userName, password);
      console.log(result);
      State.updateUserName(userName);
      State.updateAccesToken(result);
      props.history.push("/map");
    } catch {
      alert("please enter a correct user name and password");
    }
  };

  return (
    <div>
      <form
        className="modal-content animate"
        onSubmit={(e) => authenticationFunction(e)}
      >
        <div className="container">
          <label>
            <b>Username</b>
          </label>
          <input
            type="text"
            placeholder="Enter Username"
            name="uname"
            required
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          ></input>

          <label>
            <b>Password</b>
          </label>
          <input
            type="password"
            placeholder="Enter Password"
            name="psw"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></input>

          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  );
}

export default Authentication;
