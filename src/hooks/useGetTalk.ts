import { useEffect, useState } from "react";
import { fetchTalk, ITalk } from "../api/talks";

function useGetTalk(eventName: string, code: string) {
  const [loading, setLoading] = useState(true);
  const [talk, setTalk] = useState<ITalk>();

  useEffect(() => {
    setLoading(true);

    fetchTalk(eventName, code).then((talk) => {
      setTalk(talk)
      setLoading(false);
    });
  }, [eventName, code]);

  return { loading, talk };
}

export default useGetTalk;