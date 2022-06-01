import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faCog,
  faUtensils,
  faCalendarAlt
} from "@fortawesome/free-solid-svg-icons";
import "./App.scss";
import Header from "./shared/components/Header";
import Navbar from "./shared/components/Navbar";
import Recipes from "./pages/recipes/Recipes";
import Mealplanner from "./pages/mealplanner/Mealplanner";
import Settings from "./pages/profile/Settings";
import RecipeForm from "./pages/recipes/RecipeForm";
import ViewRecipe from "./pages/recipes/ViewRecipe";

library.add(faCog, faUtensils, faCalendarAlt);

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Recipes />} />
        <Route path="/mealplanner" element={<Mealplanner />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/recipes/new" element={<RecipeForm />} />
        <Route path="/recipes/view/:recipeId" element={<ViewRecipe />} />
      </Routes>
      <Navbar />
    </Router>
  );
}

export default App;
