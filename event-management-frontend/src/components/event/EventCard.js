import React from "react";
import ImageArea from "./ImageArea";
import MainArea from "./MainArea";
import classes from "./event.module.css";
import { useDispatch, useSelector } from "react-redux";
import { userAction } from "../../store";

function EventCard(props) {
  const { data } = props;
  console.log(props);
  const _id = data?.event._id;
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const handleEventClick = (id) => {
    dispatch(userAction.setEvent({ id }));
    data.history.push("event");
  };
  return (
    <div
      className={classes.front}
      onClick={(e) => {
        handleEventClick(_id);
      }}
    >
      {data.event && data.event.image.length > 0 && (
        <ImageArea image={data.event.image[0]} title={data.event.name} />
      )}
      <MainArea
        desc={data.event.description}
        duration={data.event.duration}
        date={data.event.date}
      />
    </div>
  );
}

export default EventCard;
