import { Stack } from "@chakra-ui/layout";
import { Skeleton } from "@chakra-ui/skeleton";
import {
  Redirect,
  Route,
  Switch,
  useParams,
  useRouteMatch,
} from "react-router";
import Event from "../../components/Event";
import useGetEvent from "../../hooks/useGetEvent";
import Speaker from "../Speaker";
import Talk from "../Talk";

function EventPage() {
  const { path } = useRouteMatch();
  const { eventName } = useParams<{ eventName: string }>();
  const { loading, event } = useGetEvent(eventName);

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
    <Switch>
      <Route exact path={path}>
        <Redirect to={`${eventName}/${event?.date_from}`} />
      </Route>
      <Route path={`${path}/talk/:code`}>
        <Talk event={event!} />
      </Route>
      <Route path={`${path}/speaker/:code`}>
        <Speaker event={event!} />
      </Route>
      <Route path={`${path}/:date`}>
        <Event event={event!} />
      </Route>
    </Switch>
  );
}

export default EventPage;
