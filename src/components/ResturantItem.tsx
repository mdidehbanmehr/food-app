import { Card, Row } from "antd";
import React from "react";

const { Meta } = Card;

export const ResturantItem = ({
  name,
  photo_ref,
  distance,
}: {
  name: string;
  photo_ref: string | null;
  distance: string;
}) => {
  return (
    <Card
      style={{ width: "15%", marginBottom: "100px", border: "2px solid #dadee0", marginLeft: "50px"}}
      cover={
        photo_ref ? (
          <img
            style={{height: "200px", width: "100%", objectFit: "cover"}}
            alt="example"
            src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=300
          &photoreference=${photo_ref}&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`}
          />
        ) : (
          <img
            alt="example"
            src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
          />
        )
      }
    >
      <Meta title="Card title" description="This is the description" />
    </Card>
  );
};
