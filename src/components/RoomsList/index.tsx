import { useEffect, useState } from "react";
import TalksList from "../TalksList";
import { ITalk } from "../../api/talks";
import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/tabs";

interface IProps {
  talks: Array<ITalk>;
}

interface ITalksPerRoom {
  [room: string]: Array<ITalk>;
}

function RoomsList({ talks }: IProps) {
  const [talksPerRoom, setTalksPerRoom] = useState<ITalksPerRoom>({});

  useEffect(() => {
    const talksPerRoom = talks.reduce<ITalksPerRoom>((result, talk) => {
      const roomName = talk.slot.room.en;

      return {
        ...result,
        [roomName]: [...(result[roomName] || []), talk],
      };
    }, {});

    setTalksPerRoom(talksPerRoom);
  }, [talks]);

  return (
    <Tabs>
      <TabList>
        {Object.keys(talksPerRoom).map((room) => (
          <Tab key={room}>{room}</Tab>
        ))}
      </TabList>

      <TabPanels>
        {Object.keys(talksPerRoom).map((roomName) => (
          <TabPanel key={roomName}>
            <TalksList talks={talksPerRoom[roomName]} />
          </TabPanel>
        ))}
      </TabPanels>
    </Tabs>
  );
}

export default RoomsList;
