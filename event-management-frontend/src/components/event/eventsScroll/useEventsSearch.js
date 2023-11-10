import { useEffect, useState } from "react";
import Fetch from "../../../actions/fetch";

export default function useEventsSearch(query = "", offset) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [events, setEvents] = useState([]);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    // every time we change our query setEvents array will be resetted then will give me the result of my new search
    setEvents([]);
  }, [query]);

  // eslint-disable-next-line
  useEffect(async () => {
    setLoading(true);
    setError(false);
    let limit = 3;
    const eventsResponse = await Fetch(
      "GET",
      `event/get?limit=${limit}&offset=${offset}${query}`
    );
    if (eventsResponse.success) {
      setEvents((prevEvents) => {
        return [...new Set([...prevEvents, ...eventsResponse.events])]; // new set to prevent duplicates // i:e it will not get previously rendered data again
      });
      setHasMore(eventsResponse.events.length > 0);
      setLoading(false);
    }
  }, [offset, query]);

  return { loading, error, events, hasMore };
}
