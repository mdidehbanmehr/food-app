import axios from "axios";
import React from "react";
import "./App.css";
import { HeaderBar } from "./components/index";
import { ResturantItem } from "./components/index";

// import axios
function App() {
  const getPosition = (): Promise<GeolocationPosition> => {
    return new Promise((resolve, reject) => {
      navigator.geolocation.watchPosition(resolve, reject);
    });
  };

  const getResturants = async () => {
    //   if (navigator.geolocation) {
    //     let id = navigator.geolocation.watchPosition((pos) => {
    //       console.log(pos.coords.latitude);
    //     });
    //   }

    getPosition()
      .then((position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        console.log(position.coords.latitude);
        console.log(position.coords.longitude);
        const proxyurl = "https://cors-anywhere.herokuapp.com/";
        const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat}%2C${lng}&type=restaurant&rankby=distance&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`;
        var config = {
          method: "get",
          url: `${proxyurl + url}`,
          headers: {},
        };
        axios(config)
          .then(function (response) {
            console.log(response.data["results"][0]);
          })
          .catch(function (error) {
            console.log(error);
          });
      })
      .catch((err) => {
        console.error(err.message);
      });
  };

  return (
    <>
      <HeaderBar
        header={"Food recommender"}
        text={"Below you can see the 10 nearest resturants"}
      />
      <div>
        <button onClick={getResturants} className="Filter">
          Filter
        </button>
      </div>
      <ResturantItem name={"Max Burgers"} distance={"10km away"} />
      <ResturantItem name={"King Burgers"} distance={"5km away"} />
    </>
  );
}

export default App;
