import React from "react";
import Item from "./item";
import Slider from "react-slick";
import "./slick-theme.min.css";
import "./slick.min.css";

const Carousel = (props) => {
  const { items, settings, history } = props;
  return (
    <>
      <Slider style={{ width: "100% !important" }} {...settings}>
        {items.map((item) => {
          return <Item history={history} item={item} />;
        })}
      </Slider>
    </>
  );
};
export default Carousel;
