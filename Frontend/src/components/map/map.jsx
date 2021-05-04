import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../../context/context";
import { getAccountsFromApi } from "../../services/accounts";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import "./map.css";

function Map() {
  const State = useContext(UserContext);
  const [accounts, setAccounts] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [maxOpp, setmaxOpp] = useState(15);

  const API_KEY = "AIzaSyCJ3FMs16Nk-7_tE7RclqD3sfSsHOpKCUU";

  const [viewPort, setViewPort] = useState({
    latitude: 43.15849,
    longitude: -77.59431,
    zoom: 10,
    width: "100vw",
    height: "100vh",
  });

  const getCoordinates = (account) => {
    let address =
      account.shipping_address_street +
      " " +
      account.shipping_address_city +
      " " +
      account.shipping_address_state +
      " " +
      account.shipping_address_postalcode +
      " " +
      account.shipping_address_country;
    console.log(address);
    if (address != "") {
      if (API_KEY) {
        let _fire = fetch(
          "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
            address +
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
    let records = result.records.slice(1, maxOpp);
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

  const handleChangeInput = (e) => {
    setmaxOpp(e.target.value);
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

  useEffect(() => {
    getOpportonities();
  }, [maxOpp]);

  return (
    <div>
      <ReactMapGL
        {...viewPort}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        onViewportChange={(viewPort) => {
          setViewPort(viewPort);
        }}
      >
        <input
          onChange={(e) => {
            handleChangeInput(e);
          }}
        ></input>
        {accounts.map((account, index) => (
          <Marker
            key={index}
            latitude={account.coordinates[1]}
            longitude={account.coordinates[0]}
          >
            <button
              className="marker-btn"
              onClick={(e) => {
                e.preventDefault();
                setSelectedAccount(account);
              }}
            >
              <img src="/team.svg" alt="Skate Park Icon" />
            </button>
          </Marker>
        ))}

        {selectedAccount ? (
          <Popup
            latitude={selectedAccount.coordinates[1]}
            longitude={selectedAccount.coordinates[0]}
            onClose={() => {
              setSelectedAccount(null);
            }}
          >
            <div>
              <h2>{selectedAccount.account.name}</h2>
              <p>{selectedAccount.account.industry}</p>
            </div>
          </Popup>
        ) : null}
      </ReactMapGL>
    </div>
  );
}

export default Map;
