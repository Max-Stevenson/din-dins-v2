import React from "react";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faCog, faUtensils, faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import "./App.css";
import Navbar from "./shared/Navbar";

library.add(faCog, faUtensils, faCalendarAlt);

function App() {
  return <Navbar />;
}

export default App;
