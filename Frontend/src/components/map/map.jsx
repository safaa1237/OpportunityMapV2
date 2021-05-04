import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../../context/context";
import { getAccountsFromApi } from "../../services/accounts";

function Map() {
  const State = useContext(UserContext);
  const [accounts, setAccounts] = useState([]);
  useEffect(async () => {
    console.log(State.accessToken);
    let result = await getAccountsFromApi(State.accessToken);
    setAccounts(result);
  }, []);

  return (
    <div>
      <p>{State.userName}</p>
    </div>
  );
}

export default Map;
