import React, { useCallback, useEffect, useRef, useState } from "react";
import Fetch from "../../actions/fetch";
import Carousel from "../../components/carousel/carousel";
import { landingSettings } from "../../components/carousel/carouselSettings";
import useEventsSearch from "../../components/event/eventsScroll/useEventsSearch";
import Separator from "../../components/separator/separator";
import Event from "../../components/event/event";
import { Grid } from "@mui/material";

const Landing = (props) => {
  //Begin infinite scroll setup
  const [query, setQuery] = useState("");
  const [pageNumber, setPageNumber] = useState(0);
  const { events, hasMore, loading, error } = useEventsSearch(
    query,
    pageNumber
  );

  const observer = useRef(); //observer: get element reference to the very last element in our events array
  const lastEventElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPageNumber((prevPageNumber) => prevPageNumber + 3);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  //end infinite scroll setup

  const settings = landingSettings;
  const [categories, setCategories] = useState([]);
  // eslint-disable-next-line
  useEffect(async () => {
    const response = await Fetch("GET", "category/get");
    setCategories(response.categories);
    setPageNumber(0);
  }, []);
  const history = props.history;
  return (
    <>
      <h2>Categories</h2>
      <Carousel
        history={props.history}
        settings={settings}
        items={categories}
      ></Carousel>
      <Separator space="10px"></Separator>
      <h2>Events</h2>
      <Grid container spacing={2}>
        {events.map((event, index) => {
          if (events.length === index + 1) {
            return (
              <Grid item xs={4} >
                <div ref={lastEventElementRef} key={event._id}>
                  <Event event={event} history={history}></Event>
                  {/* <div>Yayy!! You have reached the end</div> */}
                </div>
              </Grid>
            );
          } else {
            // return <Event event={event} history={history}></Event>;
            return (
              <Grid item xs={4}>
                <Event event={event} history={history}></Event>
              </Grid>
            );
          }
        })}
      </Grid>
      <Separator space="15px" />
      {hasMore ? (
        loading && <div style={{ textAlign: "center" }}>{"Loading..."}</div>
      ) : !loading && events && events.length > 0 ? (
        <div style={{ textAlign: "center" }}>Yayy!! You have reached the end</div>
      ) : (
        <div>No events</div>
      )}
      <div>{error && "Error"}</div>
    </>
  );
};

export default Landing;
