import { Box, Heading, Link, Stack, Text } from "@chakra-ui/layout";
import { Skeleton } from "@chakra-ui/skeleton";
import { useParams } from "react-router";
import { Link as RouterLink } from "react-router-dom";
import { IEvent } from "../../api/events";
import useGetTalk from "../../hooks/useGetTalk";

interface IProps {
  event: IEvent;
}

function Talk({ event }: IProps) {
  const { code } = useParams<{ code: string }>();
  const { loading, talk } = useGetTalk(event.slug, code);

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
      <Heading>{talk?.title}</Heading>
      <Text>{talk?.description}</Text>
      <Heading as="h4" size="md" mt={6}>
        Speakers
      </Heading>
      {talk?.speakers.map((speaker) => (
        <Box key={speaker.code}>
          <Link
            as={RouterLink}
            to={`/${event.slug}/speaker/${speaker.code}`}
            color="teal.500"
            mr={3}
          >
            {speaker.name}
          </Link>
        </Box>
      ))}
    </>
  );
}

export default Talk;
