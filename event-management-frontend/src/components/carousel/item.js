import { Button, Paper } from "@mui/material";
import React from "react";
import classes from "./item.module.css";
import { useDispatch } from "react-redux";
import { userAction } from "../../store";

const Item = (props) => {
  const dispatch = useDispatch();

  const { item, history } = props;
  const { name, description, isButtonVisible, image } = item;
  const handleClick = (catid) => {
    dispatch(userAction.setCategory({ id: catid }));
    history.push(`/events`);
  };
  let paperStyle = {};
  let paperClass = {};

  if (isButtonVisible) {
    paperStyle = {};
    paperClass = "";
  } else {
    paperStyle = {
      background: `url(http://localhost:5000/${image})`,
    };
    paperClass = classes["item-bg"];
  }

  return (
    <Paper
      style={paperStyle}
      className={`${paperClass} ${classes["item-height"]}`}
      key={item._id}
    >
      <div>
        <h2 className={classes["item-title"]}>{name}</h2>
      </div>
      <p>{description}</p>
      <Button
        onClick={(e) => {
          handleClick(item._id);
        }}
        className={classes["viewButton"]}
      >
        View Events
      </Button>
    </Paper>
  );
};
export default Item;
