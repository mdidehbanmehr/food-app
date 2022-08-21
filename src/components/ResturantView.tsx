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
  console.log(resturantsNearby?.results);
  // console.log(resturantsNearby);
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
                resturantsNearby.results?.map((resturant) => {
                  console.log(resturant.name);
                  return (
                    <ResturantItem
                      name={resturant.name ?? ""}
                      photo_ref={null}
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
