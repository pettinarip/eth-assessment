import { Flex, Heading, Link, Spacer, Stack } from "@chakra-ui/layout";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link as RouterLink } from "react-router-dom";
import RoomsList from "../../components/RoomsList";
import { IEvent } from "../../api/events";
import { ITalk } from "../../api/talks";
import dayjs from "dayjs";
import useGetTalks from "../../hooks/useGetTalks";
import { Skeleton } from "@chakra-ui/skeleton";

interface IProps {
  event: IEvent;
}

function Event({ event }: IProps) {
  const { loading, talks } = useGetTalks(event.slug);
  const { date } = useParams<{ date: string }>();
  const [talksInDate, setTalksInDate] = useState<Array<ITalk>>([]);

  useEffect(() => {
    const filteredTalks = talks.filter((talk) => {
      return talk.slot.start.includes(date);
    });

    setTalksInDate(filteredTalks);
  }, [talks, date]);

  const nextDay = dayjs(date).add(1, "day");
  const prevDay = dayjs(date).subtract(1, "day");
  const isLastDay = date === event.date_to;
  const isFirstDay = date === event.date_from;

  if (loading) {
    return (
      <Stack>
        <Skeleton height="20px" />
        <Skeleton height="20px" />
        <Skeleton height="20px" />
      </Stack>
    );
  }

  return (
    <>
      <Heading mb={6}>
        {event.name.de} <small>{dayjs(date).format("MMM D, YYYY")}</small>
      </Heading>
      <Flex>
        {!isFirstDay && (
          <Link
            as={RouterLink}
            to={`/${event.slug}/${prevDay.format("YYYY-MM-DD")}`}
            color="teal.500"
            mr={3}
          >
            Go To Prev Day
          </Link>
        )}
        <Spacer />
        {!isLastDay && (
          <Link
            as={RouterLink}
            to={`/${event.slug}/${nextDay.format("YYYY-MM-DD")}`}
            color="teal.500"
          >
            Go To Next Day
          </Link>
        )}
      </Flex>
      <RoomsList talks={talksInDate} />
    </>
  );
}

export default Event;
