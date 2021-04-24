import { useEffect, useState } from "react";
import { fetchSpeaker, ISpeaker } from "../api/speakers";

function useGetSpeaker(eventName: string, code: string) {
  const [loading, setLoading] = useState(true);
  const [speaker, setSpeaker] = useState<ISpeaker>();

  useEffect(() => {
    setLoading(true);

    fetchSpeaker(eventName, code).then((speaker) => {
      setSpeaker(speaker)
      setLoading(false);
    });
  }, [eventName, code]);

  return { loading, speaker };
}

export default useGetSpeaker;