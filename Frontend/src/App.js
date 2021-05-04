import { UserContext } from "./context/context";
import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Authentication from "./components/authentification/authentification";
import Map from "./components/map/map";

function App() {
  const [userName, setUserName] = useState("");
  const [accessToken, setAccessToken] = useState(
    "86c4fccc-561e-4631-8742-a3a93a8e76c8"
  );

  const updateUserName = (name) => {
    setUserName(name);
  };
  const updateAccessToken = (token) => {
    setAccessToken(token);
  };
  const initialState = {
    userName,
    updateUserName,
    accessToken,
    updateAccessToken,
  };

  return (
    <Router>
      <div className="App">
        <Switch>
          <UserContext.Provider value={initialState}>
            <Route path="/" exact component={Authentication} />
            <Route path="/map" component={Map} />
          </UserContext.Provider>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
