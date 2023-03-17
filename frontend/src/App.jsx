import React, {
  useMemo, useState, lazy, Suspense
} from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faCog,
  faUtensils,
  faCalendarAlt
} from "@fortawesome/free-solid-svg-icons";
import "./App.scss";
import { Header, Navbar, ProtectedRoute } from "./components/index";
import Settings from "./pages/profile/Settings";
import RecipeForm from "./pages/recipes/RecipeForm";
import ViewRecipe from "./pages/recipes/ViewRecipe";
import RecipesContext from "./shared/context/RecipesContext";
import { AuthProvider } from "./shared/context/AuthContext";
import UserPortal from "./pages/profile/UserPortal";

const Recipes = lazy(() => import("./pages/recipes/Recipes"));
const Mealplanner = lazy(() => import("./pages/mealplanner/Mealplanner"));

library.add(faCog, faUtensils, faCalendarAlt);

function App() {
  const [contextRecipes, setContextRecipes] = useState(undefined);
  const recipeValue = useMemo(
    () => ({ contextRecipes, setContextRecipes }),
    [contextRecipes, setContextRecipes]
  );

  return (
    <Router>
      <AuthProvider>
        <Header />
        <RecipesContext.Provider value={recipeValue}>
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route
                path="/"
                element={(
                  <ProtectedRoute>
                    <Recipes />
                  </ProtectedRoute>
              )}
              />
              <Route
                path="/mealplanner"
                element={(
                  <ProtectedRoute>
                    <Mealplanner />
                  </ProtectedRoute>
              )}
              />
              <Route path="/settings" element={<Settings />} />
              <Route path="/recipes/new" element={<RecipeForm mode="new" />} />
              <Route path="/recipes/view/:recipeId" element={<ViewRecipe />} />
              <Route
                path="/recipes/edit/:recipeId"
                element={(
                  <ProtectedRoute>
                    <RecipeForm mode="edit" />
                  </ProtectedRoute>
              )}
              />
              <Route path="/profile" element={<UserPortal />} />
            </Routes>
          </Suspense>
        </RecipesContext.Provider>
      </AuthProvider>
      <Navbar />
    </Router>
  );
}

export default App;
