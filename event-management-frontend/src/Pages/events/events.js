import React, { useCallback, useEffect, useRef, useState } from "react";
import Fetch from "../../actions/fetch";
import useEventsSearch from "../../components/event/eventsScroll/useEventsSearch";
import Event from "../../components/event/event";
import Dropdown from "../../components/dropdown/dropdown";
import { useSelector } from "react-redux";
import { userAction } from "../../store";
import { Grid } from "@mui/material";
import Separator from "../../components/separator/separator";

const EventsPage = (props) => {
  const user = useSelector((state) => state.user);

  const { history } = props;
  let [catid, setCatId] = useState("");
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
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

  // eslint-disable-next-line
  useEffect(async () => {
    setPageNumber(0);
    setCatId(user.category._id);
    if (user.category._id && user.category._id != "") {
      setQuery("&category=" + user.category._id);
    } else {
      setQuery("&category=" + user.category._id);
    }
    const response = await Fetch(
      "GET",
      `category/get?limit=${100}&offset=${0}`
    );
    setCategories(response.categories);
  }, [user.category]);
  const handleChange = (event) => {
    setCategory(event.target.value);
    setQuery("&category=" + event.target.value);
    setPageNumber(0);
  };
  return (
    <>
      <Dropdown
        val={category}
        handleChange={handleChange}
        items={categories}
        label="Categories"
      ></Dropdown>
      <div style={{padding: "20px 0px" }}>
        <Grid container spacing>
          {events.map((event, index) => {
            if (events.length === index + 1) {
              return (
                <Grid item xs={4}>
                  <div ref={lastEventElementRef} key={event._id}>
                    {/* <Event event={event} history={history}></Event> */}
                    {/* <div>Yayy!! You have reached the end</div> */}

                    <Event event={event} history={history}></Event>

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
          <div style={{ textAlign: "center" }}>
            Yayy!! You have reached the end
          </div>
        ) : (
          <div>No events</div>
        )}
        <div>{error && "Error"}</div>
      </div>
    </>
  );
};
export default EventsPage;
