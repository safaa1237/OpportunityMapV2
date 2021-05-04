import React, { useState, useContext } from "react";
import { UserContext } from "../../context/context";

function Map() {
  const State = useContext(UserContext);
  return (
    <div>
      <p>{State.userName}</p>
    </div>
  );
}

export default Map;
