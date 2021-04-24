import { Heading, Stack, Text } from "@chakra-ui/layout";
import { Skeleton } from "@chakra-ui/skeleton";
import { useParams } from "react-router";
import { IEvent } from "../../api/events";
import useGetSpeaker from "../../hooks/useGetSpeaker";

interface IProps {
  event: IEvent;
}

function Speaker({ event }: IProps) {
  const { code } = useParams<{ code: string }>();
  const { loading, speaker } = useGetSpeaker(event?.slug, code);

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
      <Heading>{speaker?.name}</Heading>
      <Text>{speaker?.biography}</Text>
    </>
  );
}

export default Speaker;
