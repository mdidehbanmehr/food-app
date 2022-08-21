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
      <Conditional
        condition={isLoading}
        falseRender={
          <>
            <HeaderBar
              header={"Restaurant Finder"}
              text={"Below you can see 10 restaurants near you..."}
            />
            <Row style={styles.row}>
              {results?.slice(10).map((resturant, index) => {
                return (
                  <ResturantItem
                    name={resturant.name ?? ""}
                    photos={
                      resturant.photos.length > 4
                        ? resturant.photos.slice(4)
                        : resturant.photos
                    }
                    distance={
                      `${rows?.at(0)?.elements.at(index)?.distance.text} or ${
                        rows?.at(0)?.elements.at(index)?.duration.text
                      } away` ?? "Close enough"
                    }
                    rating={resturant.rating ?? 0}
                    reviewCount={resturant.user_ratings_total ?? 0}
                  />
                );
              })}
            </Row>
          </>
        }
        trueRender={
          <div style={styles.cardContainer}>
            <div style={styles.card}>
              <img
                style={styles.image}
                alt="Restaurant Finder Logo"
                src="favicon.ico"
              ></img>
              <p>Finding restaurants near you...</p>
              <SpinnerLoader />
            </div>
          </div>
        }
      />
    </>
  );
};
const styles = StyleSheet.create({
  card: {
    color: "white",
    fontFamily: "Varela Round, Sans-serif",
    fontStyle: "normal",
    fontWeight: "700",
    letterSpacing: "0.07em",
    fontSize: "32px",
    height: "100%",
  },
  image: {
    opacity: "45%",
    height: "150px",
    marginTop: "15%",
    marginBottom: "5%",
    marginLeft: "calc(50% - 75px)",
  },
  cardContainer: {
    height: "100vh",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    backgroundColor: "#365956",
  },
  row: {
    marginTop: "25px",
    display: "flex",
    justifyContent: "center",
  },
});
