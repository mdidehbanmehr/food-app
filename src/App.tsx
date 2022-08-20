import { Row } from "antd";
import axios from "axios";
import React, { useEffect } from "react";
import "./App.css";
import { HeaderBar } from "./components/index";
import { ResturantItem } from "./components/index";
import useGeolocation from "react-hook-geolocation";

interface Resturants {
  name: string;
  photo: {
    height: number;
    html_attributions: object;
    photo_reference: string;
    width: number;
  };
  rating: number;
  lat: number;
  lng: number;
}

interface ResturantDistance extends Resturants {
  distance: string;
  duration: string;
}

function App() {
  const geolocation = useGeolocation();
  useEffect(() => {
    console.log(
      "latitude and longitude: ",
      geolocation.latitude,
      geolocation.longitude
    );
  }, [geolocation.latitude, geolocation.longitude]);

  const getDetail = async (
    currentLat: number | undefined,
    currentLng: number | undefined
  ): Promise<Resturants[]> => {
    // const proxyurl = "https://cors-anywhere.herokuapp.com/";
    const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${currentLat}%2C${currentLng}&type=restaurant&rankby=distance&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`;
    let idProps = {
      method: "get",
      url: `${url}`,
      headers: {},
    };
    return axios(idProps)
      .then(async (response) => {
        return await response.data["results"].map(
          (resturant: google.maps.places.PlaceResult) => {
            return {
              name: resturant.name,
              photo: resturant.photos?.at(0),
              rating: resturant.rating,
              lat: resturant.geometry?.location?.lat,
              lng: resturant.geometry?.location?.lng,
            };
          }
        );
      })
      .catch((err) => {
        return err;
      });
  };

  const getDistance = async (
    resturants: Resturants[],
    currentLat: number,
    currentLng: number
  ): Promise<ResturantDistance[]> => {
    return await Promise.all(
      resturants.map(async (resturant) => {
        let test = async () => {
          const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${currentLat}%2C${currentLng}&destinations=${resturant.lat}%2C${resturant.lng}&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`;
          let config = {
            method: "get",
            url: url,
            headers: {},
          };
          return await axios(config)
            .then(async (response): Promise<ResturantDistance> => {
              const data: google.maps.DistanceMatrixResponse = response.data;

              return {
                ...resturant,
                distance: data.rows[0].elements[0].distance.text,
                duration: data.rows[0].elements[0].duration.text,
              };
            })
            .catch((err) => {
              return err;
            });
        };
        return await test();
      })
    );
  };

  const getResturants = async (lat: number, lng: number) => {
    const resturants = await getDetail(lat, lng);
    return await getDistance(resturants, lat, lng);
  };

  return (
    <>
      <HeaderBar
        header={"Food recommender"}
        text={"Below you can see the 10 nearest resturants"}
      />
      <div>
        <button
          onClick={async () =>
            console.log(
              await getResturants(geolocation.latitude, geolocation.longitude)
            )
          }
          className="Filter"
        >
          Filter
        </button>
      </div>
      <Row style={{ marginTop: "25px" }}>
        <ResturantItem
          name={"Max Burgers"}
          distance={"10km away"}
          photo_ref={
            "AeJbb3fLPlLAljgEuJHDn8NCqn03p_CrY5OQw4QShNRSIp7zqFcSY-rA2yg-TWYY6RcOI3nTTaDdfvo1Wsz-ABH8vOzkJh0wldgSSJ-Q8DXSCtqbyjM8zIPAa-eDJyseNpHshjK3Q3Tx7FHtXyi1gHy1zDDGL-l-JbM7YjBrBziV3fNxQhCe"
          }
        />
        <ResturantItem
          name={"King Burgers"}
          distance={"5km away"}
          photo_ref={
            "AeJbb3fQHxDE8kQGN4_usC3Ym2PbzxBWnZxCoxkn9xdylDDAfu9jVQsiwOEVnf1v54Fg3FDGvgq92fiqm0YJMqPP7m4PYiZmaZ8XzjhtwbKZft8SSwRByDmlsPdvlepTlEx29tBebXEXjMUCQhXAZKrVlzUfFq8Ekpk1MicipPUcR7PMTsr5"
          }
        />
      </Row>
    </>
  );
}

export default App;
