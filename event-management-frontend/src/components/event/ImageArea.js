import React from "react";
import classes from "./event.module.css";
const ImageArea = (props) => {
  return (
    <div className={classes.imageContainer}>
      <img
        className={classes.cardImage}
        src={"http://localhost:5000/" + props.image}
      ></img>
      <h1 className={classes.title}>{props.name}</h1>
    </div>
  );
};

export default ImageArea;
