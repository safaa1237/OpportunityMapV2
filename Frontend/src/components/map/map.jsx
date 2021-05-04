import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../../context/context";
import { getAccountsFromApi } from "../../services/accounts";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import "./map.css";

function Map() {
  const State = useContext(UserContext);
  const [accounts, setAccounts] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState(null);

  const API_KEY = "AIzaSyCJ3FMs16Nk-7_tE7RclqD3sfSsHOpKCUU";

  const [viewPort, setViewPort] = useState({
    latitude: 48.7758,
    longitude: 9.1829,
    zoom: 10,
    width: "100vw",
    height: "100vh",
  });

  const getCoordinates = (account) => {
    let address =
      account.shipping_address_street +
      account.shipping_address_city +
      account.shipping_address_state +
      account.shipping_address_postalcode +
      account.shipping_address_country;

    if (address != "") {
      if (API_KEY) {
        let _fire = fetch(
          "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
            "321 University Ave. Cupertino NY 93207 USA" +
            ".json?access_token=" +
            process.env.REACT_APP_MAPBOX_TOKEN
        );
        return _fire
          .then((resp) => {
            return resp.json().then((res) => {
              return res.features[0].geometry.coordinates;
            });
          })
          .catch((error) => {});
      }
    }
  };

  const getData = async () => {
    console.log(State.accessToken);
    let result = await getAccountsFromApi(State.accessToken);
    let records = result.records.slice(1, 15);
    return records;
  };

  const getLocation = (records) => {
    const locations = [];
    records.map(async (account) => {
      let coordinates = await getCoordinates(account);
      let opp = { account, coordinates };
      locations.push(opp);
    });
    console.log(locations);
    return locations;
  };

  const getOpportonities = async () => {
    const res = await getData();
    const result = await getLocation(res);
    setAccounts(result);
  };

  useEffect(() => {
    getOpportonities();
    const listener = (e) => {
      if (e.key === "Escape") {
        setSelectedAccount(null);
      }
    };
    window.addEventListener("keydown", listener);

    return () => {
      window.removeEventListener("keydown", listener);
    };
  }, []);

  return (
    <div>
      <ReactMapGL
        {...viewPort}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        onViewportChange={(viewPort) => {
          setViewPort(viewPort);
        }}
      >
        {accounts.map((account, index) => (
          <Marker
            key={index}
            latitude={account.coordinates[0]}
            longitude={account.coordinates[1]}
          >
            <button
              className="marker-btn"
              onClick={(e) => {
                e.preventDefault();
                setSelectedAccount(account);
              }}
            >
              here
            </button>
          </Marker>
        ))}

        {selectedAccount ? (
          <Popup
            latitude={1}
            longitude={1}
            onClose={() => {
              setSelectedAccount(null);
            }}
          >
            <div>
              <h2>{selectedAccount.account.name}</h2>
              <p>{selectedAccount.coordinates[0]}</p>
            </div>
          </Popup>
        ) : null}
      </ReactMapGL>
    </div>
  );
}

export default Map;
