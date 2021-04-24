import { VStack } from "@chakra-ui/layout";
import { useEffect, useState } from "react";
import { ITalk } from "../../api/talks";
import Talk from "../Talk";

interface IProps {
  talks: Array<ITalk>;
}

function TalksList({ talks }: IProps) {
  const [sortedTalks, setSortedTalks] = useState<Array<ITalk>>([]);

  useEffect(() => {
    const sortedTalks = talks.sort((a, b) => {
      return a.slot.start.localeCompare(b.slot.start);
    });

    setSortedTalks(sortedTalks);
  }, [talks]);

  return (
    <VStack align="stretch">
      {sortedTalks.map((talk) => (
        <Talk key={talk.code} talk={talk}></Talk>
      ))}
    </VStack>
  );
}

export default TalksList;
