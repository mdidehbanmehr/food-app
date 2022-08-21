import React from "react";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { StyleSheet } from "../models/StyleSheet";

export function SpinnerLoader() {
  return (
    <div style={styles.container}>
      <Spin indicator={<LoadingOutlined style={{ fontSize: 50 }} spin />} />
    </div>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "center",
  },
});
