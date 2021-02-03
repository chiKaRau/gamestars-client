import React from "react";

//React Router
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

//Styles
import "./styles.scss";

//Redux
import Redux from "./redux/Redux";
import { Provider } from "react-redux";

//Components
import GamesList from "./components/GamesList";
import GamePage from "./components/GamePage";
import Header from "./components/Header";

export default function App() {
  return (
    <Provider store={Redux()}>
      <Router>
        <Header />

        {/**Routes */}
        <Switch>
          <Route exact path="/" component={GamesList} />
          <Route exact path="/gameslist/:page" component={GamesList} />
          <Route exact path="/game/:gameId" component={GamePage} />
        </Switch>
      </Router>
    </Provider>
  );
}
