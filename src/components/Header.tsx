import React from "react";
import { StyleSheet } from "../models/StyleSheet";

export const HeaderBar = ({
  header,
  text,
}: {
  header: string;
  text: string;
}) => {
  return (
    <div style={styles.topBar}>
      <div style={styles.topBarContainer}>
        <h1 style={styles.topBarHeader}>{header}</h1>
        <p style={styles.topBarText}>{text}</p>
      </div>
    </div>
  );
};

const styles = StyleSheet.create({
  topBar: {
    margin: "0px -24px",
    background: "#365956",
  },
  topBarContainer: {
    padding: "32px 160px",
  },
  topBarHeader: {
    color: "white",
    fontFamily: "Varela Round, Sans-serif",
    fontStyle: "normal",
    fontWeight: "700",
    fontSize: "32px",
    lineHeight: "35px",
    letterSpacing: "0.07em",
    marginBottom: "8px",
  },
  topBarText: {
    color: "white",
    fontFamily: "Varela Round, Sans-serif",
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: "16px",
    lineHeight: "17px",
    letterSpacing: "0.07em",
  },
});
