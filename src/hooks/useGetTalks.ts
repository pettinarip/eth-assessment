import { useEffect, useState } from "react";
import { fetchAllTalks, ITalk } from "../api/talks";

function useGetTalks(eventName: string) {
  const [loading, setLoading] = useState(true);
  const [talks, setTalks] = useState<Array<ITalk>>([]);

  useEffect(() => {
    setLoading(true);

    fetchAllTalks(eventName).then((talks) => {
      setTalks(talks)
      setLoading(false);
    });
  }, [eventName]);

  return { loading, talks };
}

export default useGetTalks;
