import { Card, Carousel, Rate, Badge } from "antd";
import Meta from "antd/lib/card/Meta";
import React from "react";
import { StyleSheet } from "../models/StyleSheet";

// const { Meta } = Card;
const onChange = (currentSlide: number) => {};

export const ResturantItem = ({
  name,
  rating,
  reviewCount,
  photos,
  distance,
}: {
  name: string;
  rating: number;
  reviewCount: number;
  photos: {
    height: number | null;
    html_attributions: object | null;
    photo_reference: string | null;
    width: number | null;
  }[];
  distance: string;
}) => {
  return (
    <Card
      style={styles.card}
      cover={
        <Badge.Ribbon text={`${reviewCount} Reviews`}>
          {/* <Carousel afterChange={onChange}> */}
          {photos.map((item) => {
            return item.photo_reference ? (
              <img
                style={styles.image}
                alt="example"
                src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=300&photoreference=${item.photo_reference}&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`}
              />
            ) : (
              <div>
                <img alt="resturant" src="https://picsum.photos/200/300" />
              </div>
            );
          })}
          {/* </Carousel> */}
        </Badge.Ribbon>
      }
    >
      <Meta title={name} description={distance} />
      <Rate disabled defaultValue={rating} />
    </Card>
  );
};

const styles = StyleSheet.create({
  image: {
    height: "200px",
    width: "100%",
    objectFit: "cover",
  },
  card: {
    width: "300px",
    minWidth: "200px",
    marginBottom: "100px",
    border: "2px solid #dadee0",
    margin: "30px 25px",
  },
});
