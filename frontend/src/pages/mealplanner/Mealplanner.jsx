/* eslint-disable no-lonely-if */
/* eslint-disable no-unused-vars */
import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import DatePicker from "react-datepicker";
import {
  TextField,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Grid,
  Container,
  Dialog,
  DialogContent
} from "@mui/material";
import { useAuth } from "../../shared/context/AuthContext";
import LoadingSpinner from "../../shared/components/LoadingSpinner";
import useHttpClient from "../../shared/hooks/http-hook";
import "react-datepicker/dist/react-datepicker.css";
import DisplayWrapper from "../../shared/components/DisplayWrapper";
import RecipesContext from "../../shared/context/RecipesContext";
import API_BASE_URL from "../../config";

function Mealplanner() {
  const navigate = useNavigate();
  const location = useLocation();
  const [dialogOpen, setDialogOpen] = useState(false);
  const auth = useAuth();
  const { contextRecipes, setContextRecipes } = useContext(RecipesContext);
  const [mealplan, setMealplan] = useState(null);
  const {
    error, isLoading, sendRequest, clearError
  } = useHttpClient();
  const [recipes, setRecipes] = useState();
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(null);
  const [numberOfPeople, setNumberOfPeople] = useState(2);
  const [doubleUp, setDoubleUp] = useState(false);
  const [vegetarianMeals, setVegetarianMeals] = useState(0);
  const [totalDays, setTotalDays] = useState(0);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await sendRequest(
          `${API_BASE_URL}/recipes`,
          "GET",
          null,
          { Authorization: `Bearer ${auth.token}` }
        );
        setRecipes(response.data);
        setContextRecipes(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    if (!contextRecipes || (location.state && location.state.updateRecipes)) {
      fetchRecipes();
    } else {
      setRecipes(contextRecipes);
    }
  }, [sendRequest]);

  const generateMealplan = () => {
    // Split into two lists: vegetarian and non-vegetarian
    const vegetarianRecipes = recipes.filter((recipe) => recipe.isVegetarian);
    const nonVegetarianRecipes = recipes.filter(
      (recipe) => !recipe.isVegetarian
    );

    if (vegetarianRecipes.length < vegetarianMeals
      || nonVegetarianRecipes.length < (totalDays - vegetarianMeals)) {
      setDialogOpen(true);
      return;
    }

    // Sort both lists by dateLastConsumed (oldest first)
    vegetarianRecipes.sort(
      (a, b) => new Date(a.dateLastConsumed) - new Date(b.dateLastConsumed)
    );
    nonVegetarianRecipes.sort(
      (a, b) => new Date(a.dateLastConsumed) - new Date(b.dateLastConsumed)
    );

    // Initialize meal plan
    const mealPlan = [];

    // Loop over each day
    for (let i = 0; i < totalDays; i += 1) {
      // Check if leftovers should be used and it's a leftovers day
      if (doubleUp && i % 2 === 1) {
        mealPlan.push(mealPlan[mealPlan.length - 1]); // Add last recipe again
      } else {
        // Check if a vegetarian meal is required
        if (
          mealPlan.filter((recipe) => recipe.isVegetarian).length
          < vegetarianMeals
        ) {
          if (vegetarianRecipes.length > 0) {
            // Add the least recently consumed vegetarian recipe
            mealPlan.push(vegetarianRecipes.shift());
          } else {
            // no vegetarian recipes are left, add the least recently consumed non-vegetarian recipe
            mealPlan.push(nonVegetarianRecipes.shift());
          }
        } else {
          // If no vegetarian meal is required, add the least recently consumed recipe
          if (nonVegetarianRecipes.length > 0) {
            mealPlan.push(nonVegetarianRecipes.shift());
          } else {
            mealPlan.push(vegetarianRecipes.shift());
          }
        }
      }
    }

    // Update the state with the new meal plan
    setMealplan(mealPlan);
  };

  const onDateChange = (dates) => {
    const [start, end] = dates;
    setTotalDays(Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1);
    setStartDate(start);
    setEndDate(end);
  };

  const handleNumberOfPeopleChange = (e) => {
    const { value } = e.target;
    if (value >= 1 && value <= 20) {
      setNumberOfPeople(value);
    }
  };

  const handleVegetarianMealsChange = (e) => {
    const { value } = e.target;

    if (value >= 0 && value <= totalDays) {
      setVegetarianMeals(value);
    }
  };

  return (
    <DisplayWrapper>
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogContent>
          <p>
            There are not enough recipes to fulfill your meal plan request.
            Please adjust your parameters and try again.
          </p>
        </DialogContent>
      </Dialog>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <h2>Mealplanner</h2>
        </Grid>
        <Grid item xs={12}>
          <DatePicker
            selected={startDate}
            onChange={onDateChange}
            startDate={startDate}
            endDate={endDate}
            selectsRange
            inline
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            type="number"
            label="Number of People"
            value={numberOfPeople}
            onChange={handleNumberOfPeopleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={(
              <Checkbox
                checked={doubleUp}
                onChange={(e) => setDoubleUp(e.target.checked)}
              />
            )}
            label="Double up on meals"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            type="number"
            label="Vegetarian Meals"
            value={vegetarianMeals}
            onChange={handleVegetarianMealsChange}
          />
        </Grid>
        <Grid item xs={12}>
          <button type="button" onClick={generateMealplan}>
            Generate Mealplan
          </button>
        </Grid>
        {mealplan !== null && (
          <div>
            {mealplan.map(({ name, _id }) => (
              <div key={_id}>
                <h3>{name}</h3>
              </div>
            ))}
          </div>
        )}
      </Grid>
    </DisplayWrapper>
  );
}
export default Mealplanner;
