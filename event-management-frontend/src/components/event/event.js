import { Grid, Paper } from "@mui/material";
import React from "react";
import classes from "./event.module.css";
import { useDispatch, useSelector } from "react-redux";
import { userAction } from "../../store";
import EventCard from "./EventCard";
const Event = (props) => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const {
    event,
    history,
    // categories,
    // organizers,
    // attendees,
  } = props;
  const { _id, image, duration, date, address, description, name } = event
    ? event
    : {
        _id: "",
        image: "",
        duration: "",
        date: "",
        address: "",
        description: "",
        name: "",
      };
  const handleEventClick = (id) => {
    dispatch(userAction.setEvent({ id }));
    history.push("event");
  };
  return (
    <div
      onClick={(e) => {
        handleEventClick(_id);
      }}
    >
      <EventCard data={props} />

      {/* <Paper style={{ margin: "0rem 5rem" }}>
        <div>
          {image.length > 0 && (
            <img
              width="100%"
              height="100%"
              src={"http://localhost:5000/" + image[0]}
              alt="all-events"
            ></img>
          )}
        </div>

        <div>
          <p>{name}</p>
          <p>{duration} </p>
          <p>{date} </p>
          <p>{address.city} </p>
          <p className={classes.description}>{description}</p>
        </div>
      </Paper> */}

      {/* <Grid container style={{ height: "37vh" }}>
        <Grid item xs={6} style={{ position: "relative" }}>
          {image.length > 0 && (
            <img
              className={classes.image}
              style={{ width: "100%" }}
              src={"http://localhost:5000/" + image[0]}
              alt="all-events"
            ></img>
          )}
        </Grid>
        <Grid item xs={6} p={2}>
          <p>{name}</p>
          <p>{duration} </p>
          <p>{date} </p>
           <p>{address.city} </p>
          <p className={classes.description}>{description}</p>
        </Grid> 
      </Grid> */}
    </div>
  );
};
export default Event;
