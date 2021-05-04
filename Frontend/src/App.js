import { UserContext } from "./context/context";
import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Authentication from "./components/authentification/authentification";
import Map from "./components/map/map";

function App() {
  const [userName, setUserName] = useState("hi");
  const [accessToken, setAccessToken] = useState(null);

  const updateUserName = (name) => {
    setUserName(name);
  };
  const updateAccesToken = (token) => {
    setAccessToken(token);
  };
  const initialState = {
    userName,
    updateUserName,
    accessToken,
    updateAccesToken,
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
