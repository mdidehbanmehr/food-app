import { Row } from "antd";
import React from "react";
import useGeolocation from "react-hook-geolocation";
import { useGetResturants } from "../hooks/food";
import { StyleSheet } from "../models/StyleSheet";
import { HeaderBar, SpinnerLoader, Conditional, ResturantItem } from "./index";

export const ResturantView = () => {
  const geolocation = useGeolocation();
  const position = {
    latitude: geolocation.latitude,
    longitude: geolocation.longitude,
  };
  let { results, rows, isLoading } = useGetResturants(position);

  return (
    <>
      <HeaderBar
        header={"Food recommender"}
        text={"Below you can see the 10 nearest resturants"}
      />
      <Row style={{ marginTop: "25px" }}>
        <Conditional
          condition={isLoading}
          falseRender={
            <>
              {results?.slice(10).map((resturant, index) => {
                return (
                  <ResturantItem
                    name={resturant.name ?? ""}
                    photo_ref={resturant.photos[0].photo_reference ?? ""}
                    distance={
                      rows?.at(0)?.elements.at(index)?.distance.text ?? ""
                    }
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
