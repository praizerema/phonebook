import React from "react";
// import logo from "./logo.svg";
import "./App.css";
import Phonebook from "./components/Phonebook";
import ImageUpload from "./components/upload";
import { Switch, Route } from "react-router";

function App() {
  return (
    <div className="App">
      <ConfigRouters />
    </div>
  );
}

const ConfigRouters = () => (
  <Switch>
    <Route exact path="/" component={Phonebook} />
    <Route path="/upload" component={ImageUpload} />
    <Route component={"error"} />
  </Switch>
);

export default App;
