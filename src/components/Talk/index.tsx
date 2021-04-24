import { Box, Heading, Text } from "@chakra-ui/layout";
import dayjs from "dayjs";
import { Link, useParams } from "react-router-dom";
import { ITalk } from "../../api/talks";

interface IProps {
  talk: ITalk;
}

function Talk({ talk }: IProps) {
  const { eventName } = useParams<{ eventName: string }>();
  const date = dayjs(talk.slot.start);

  return (
    <Box p={5} shadow="md" borderWidth="1px">
      <Text as="sup">{date.format("ddd, MMM D, YYYY h:mm A")}</Text>
      <Box>
        <Heading as={Link} fontSize="xl" to={`/${eventName}/talk/${talk.code}`}>
          {talk.title}
        </Heading>
      </Box>
      <Text mt={4}>{talk.description}</Text>
    </Box>
  );
}

export default Talk;
