import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faCog,
  faUtensils,
  faCalendarAlt
} from "@fortawesome/free-solid-svg-icons";
import "./App.css";
import Navbar from "./shared/Navbar";
import Recipes from "./Recipes";
import Mealplanner from "./Mealplanner";
import Settings from "./Settings";
import ViewRecipe from "./ViewRecipe";

library.add(faCog, faUtensils, faCalendarAlt);

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Recipes />} />
        <Route path="/mealplanner" element={<Mealplanner />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/recipes/view/:recipeId" element={<ViewRecipe />} />
      </Routes>
    </Router>
  );
}

export default App;
