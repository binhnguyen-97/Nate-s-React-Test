import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import ListTodos from "./containers/ListTodos";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <ListTodos />
        </Route>
        <Route path="/:listId">
          <ListTodos />
        </Route>
        <Route path="*">
          <ListTodos />
        </Route>
      </Switch>
    </Router>
  )
}
export default App
