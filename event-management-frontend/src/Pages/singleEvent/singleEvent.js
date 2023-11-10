import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import Fetch from "../../actions/fetch";
import { landingSettings } from "../../components/carousel/carouselSettings";
import Separator from "../../components/separator/separator";
import { useSelector } from "react-redux";
import classes from "./singleEvent.module.css";
const EventPage = () => {
  const user = useSelector((state) => state.user);
  const settings = landingSettings;
  const [eventid, setEventId] = useState("");
  const [event, setEvent] = useState(null);
  const [images, setImages] = useState([]);
  useEffect(async () => {
    setEventId(user.event._id);
    const response = await Fetch("GET", "event/getEventById/" + user.event._id);
    if (response.status) {
      setEvent(response.event);
      setImages(response.event.image);
    }
  }, [user.event]);

  return (
    <>
      <h2 style={{ textAlign: "center" }}>{event && event.name}</h2>
      {images &&
        images.length > 0 &&
        (images.length == 1 ? (
          <div style={{ width: "50%", margin: "auto" }}>
            <img
              src={"http://localhost:5000/" + images[0]}
              style={{ width: "100%" }}
            />
          </div>
        ) : (
          <>
            <Slider style={{ width: "100% !important" }} {...settings}>
              {images.map((image) => {
                return (
                  <div className={classes.carouselitem}>
                    <img
                      className={classes.image}
                      src={"http://localhost:5000/" + image}
                    />
                  </div>
                );
              })}
            </Slider>
            <Separator space="20px" />
          </>
        ))}
      {event && (
        <div
          style={{
            width: images && images.length == 1 ? "50%" : "70%",
            margin: "auto",
          }}
        >
          <p>{event.description}</p>
          <p>Duration: {event.duration}</p>
          {event.date && event.date != "" && (
            <p>
              {new Date(event.date).toLocaleDateString("en-us", {
                weekday: "long",
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </p>
          )}
          {event.categories && (
            <div>
              Tags:
              {event.categories.map((category) => {
                return <span> {category.name}</span>;
              })}
            </div>
          )}
          {event.organizers &&
            event.organizers.map((organizer) => {
              return <div>Organized by: {organizer.name}</div>;
            })}
        </div>
      )}
    </>
  );
};
export default EventPage;
