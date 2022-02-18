import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faCog,
  faUtensils,
  faCalendarAlt
} from "@fortawesome/free-solid-svg-icons";
import "./App.scss";
import Header from "./shared/Header";
import Navbar from "./shared/Navbar";
import Recipes from "./Recipes";
import Mealplanner from "./Mealplanner";
import Settings from "./Settings";
import ViewRecipe from "./ViewRecipe";
import RecipeForm from "./RecipeForm";

library.add(faCog, faUtensils, faCalendarAlt);

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Recipes />} />
        <Route path="/mealplanner" element={<Mealplanner />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/recipes/view/:recipeId" element={<ViewRecipe />} />
        <Route path="/recipes/new" element={<RecipeForm />} />
      </Routes>
      <Navbar />
    </Router>
  );
}

export default App;
