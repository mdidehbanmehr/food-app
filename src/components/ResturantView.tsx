import { Row } from "antd";
import React, { useState } from "react";
import useGeolocation from "react-hook-geolocation";
import { useGetDistance, useGetResturants } from "../hooks/food";
import { StyleSheet } from "../models/StyleSheet";
import { HeaderBar, SpinnerLoader, Conditional, ResturantItem } from "./index";

export const ResturantView = () => {
  const geolocation = useGeolocation();
  const position = {
    latitude: geolocation.latitude,
    longitude: geolocation.longitude,
  };
  const { data: resturantsNearby, isLoading } = useGetResturants(position);

  const destinationCoords = resturantsNearby?.results.slice(10).map((res) => {
    return {
      latitude: res.geometry?.location?.lat(),
      longitude: res.geometry?.location?.lng(),
    };
  });
  const destinationQueryParams = {
    origin: position,
    destinations: destinationCoords,
  };
  const { data: resturantDistance } = useGetDistance(
    destinationQueryParams,
  );
  console.log(resturantDistance);

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
