import React, { useMemo, useState, useCallback } from "react";
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
import RecipesContext from "./shared/context/RecipesContext";
import AuthContext from "./shared/context/AuthContext";
import UserPortal from "./pages/profile/UserPortal";
import ProtectedRoute from "./shared/components/PrivateRoute";

library.add(faCog, faUtensils, faCalendarAlt);

function App() {
  const [contextRecipes, setContextRecipes] = useState(undefined);
  const recipeValue = useMemo(
    () => ({ contextRecipes, setContextRecipes }),
    [contextRecipes, setContextRecipes]
  );

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = useCallback(() => {
    setIsLoggedIn(true);
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
  }, []);

  const userValue = useMemo(
    () => ({
      isLoggedIn,
      setIsLoggedIn,
      login,
      logout
    }),
    [isLoggedIn, setIsLoggedIn, login, logout]
  );

  return (
    <Router>
      <Header />
      <RecipesContext.Provider value={recipeValue}>
        <AuthContext.Provider value={userValue}>
          <Routes>
            <Route
              path="/"
              element={(
                <ProtectedRoute>
                  <Recipes />
                </ProtectedRoute>
              )}
            />
            <Route path="/mealplanner" element={<Mealplanner />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/recipes/new" element={<RecipeForm />} />
            <Route path="/recipes/view/:recipeId" element={<ViewRecipe />} />
            <Route path="/user" element={<UserPortal />} />
          </Routes>
        </AuthContext.Provider>
      </RecipesContext.Provider>
      <Navbar />
    </Router>
  );
}

export default App;
