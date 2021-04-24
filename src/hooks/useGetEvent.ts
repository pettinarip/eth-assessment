import { useEffect, useState } from "react";
import { fetchEvent, IEvent } from "../api/events";

function useGetEvent(eventName: string) {
  const [loading, setLoading] = useState(true);
  const [event, setEvent] = useState<IEvent>();

  useEffect(() => {
    setLoading(true);

    fetchEvent(eventName).then((event) => {
      setEvent(event)
      setLoading(false);
    });
  }, [eventName]);

  return { loading, event };
}

export default useGetEvent