import { Container } from "@chakra-ui/layout";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import EventPage from "./pages/EventPage";

interface IProps {
  eventName: string;
}

function App({ eventName }: IProps) {
  return (
    <Container maxW="container.xl">
      <Router>
        <Switch>
          <Route exact path="/">
            <Redirect to={`/${eventName}`} />
          </Route>
          <Route path="/:eventName">
            <EventPage />
          </Route>
        </Switch>
      </Router>
    </Container>
  );
}

export default App;
