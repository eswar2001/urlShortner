import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { Home } from "./home";
export default function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/404">
            <ErrorPage />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

function ErrorPage() {
  return <h2>404</h2>;
}