import { Row } from "antd";
import React, { useState } from "react";
import useGeolocation from "react-hook-geolocation";
import { useGetResturants } from "../hooks/food";
import { StyleSheet } from "../models/StyleSheet";
import { HeaderBar, SpinnerLoader, Conditional, ResturantItem } from "./index";
export const ResturantView = () => {
  const [buttonClick, setButtonClick] = useState(false);
  const geolocation = useGeolocation();
  const position = {
    latitude: geolocation.latitude,
    longitude: geolocation.longitude,
  };
  const { data: resturantsNearby, isLoading } = useGetResturants(position);

  const coordinationDiff = resturantsNearby?.results.slice(10).map((res) => {
    return {
      currentLatitude: geolocation.latitude,
      currentLongitude: geolocation.longitude,
      destinationLatitude: res.geometry?.location?.lat,
      destinationLongitude: res.geometry?.location?.lng,
    };
  });
  // console.log(resturantsNearby);
  // const { data: resturantDistance, isLoading } = useGetResturants();
  return (
    <>
      <HeaderBar
        header={"Food recommender"}
        text={"Below you can see the 10 nearest resturants"}
      />
      <div>
        <button
          onClick={() => {
            // console.log(resturantsNearby);
          }}
          className="Filter"
        >
          Filter
        </button>
      </div>
      <Row style={{ marginTop: "25px" }}>
        <Conditional
          condition={isLoading}
          falseRender={
            <>
              {resturantsNearby?.results &&
                resturantsNearby.results?.slice(10).map((resturant) => {
                  console.log(resturant.photos[0].photo_reference);
                  return (
                    <ResturantItem
                      name={resturant.name ?? ""}
                      photo_ref={resturant.photos[0].photo_reference}
                      distance={""}
                    />
                  );
                })}
            </>
          }
          trueRender={<SpinnerLoader />}
        />
      </Row>
    </>
  );
};
