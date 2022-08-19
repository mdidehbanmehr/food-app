import { Card } from "antd";
import React from "react";

const { Meta } = Card;

export const ResturantItem = ({
  name,
  distance,
}: {
  name: string;
  distance: string;
}) => {
  return (
    <Card
      style={{ width: 300 }}
      cover={
        <img
          alt="example"
          src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
        />
      }
    >
      <Meta
        title="Card title"
        description="This is the description"
      />
    </Card>
  );
};
