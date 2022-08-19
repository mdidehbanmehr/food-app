import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { HeaderBar } from "./components/index";
import { ResturantItem } from "./components/index";
function App() {
  return (
    <>
      <HeaderBar
        header={"Food recommender"}
        text={"Below you can see the 10 nearest resturants"}
      />
      <ResturantItem name={"Max Burgers"} distance={"10km away"} />
      <ResturantItem name={"King Burgers"} distance={"5km away"} />
    </>
  );
}

export default App;
