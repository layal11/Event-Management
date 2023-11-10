import React from "react";
import classes from "./event.module.css";
const MainArea = (props) => {
  return (
    <div className={classes.mainArea}>
      <div className={classes.blogPost}>
        <p className={classes.blogContent}>Duration: {props.duration}</p>
        <p className={classes.blogContent}>Date: {props.date}</p>
        <p className={classes.blogContent}>{props.desc}</p>

        {/* <p className={classes.blogContent}>{props.title}</p> */}
        {/* <p className={classes.readMore}>Read more...</p> */}
      </div>
    </div>
  );
};
export default MainArea;
