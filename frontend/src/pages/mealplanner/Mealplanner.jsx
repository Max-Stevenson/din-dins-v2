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
import { hashCode } from "../../shared/utils/hashCode";
import MealplannerDay from "../../components/Mealplanner/MealplannerDay";

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

  // Create an array of dates between the start and end dates
  const getDatesArray = (start, end) => {
    const datesArray = [];
    const currentDate = start;

    while (currentDate <= end) {
      datesArray.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return datesArray;
  };

  const generateMealplan = () => {
    // Split into two lists: vegetarian and non-vegetarian
    const vegetarianRecipes = recipes.filter((recipe) => recipe.isVegetarian);
    const nonVegetarianRecipes = recipes.filter(
      (recipe) => !recipe.isVegetarian
    );

    // Calculate adjusted meal count based on double up option
    const adjustedVegetarianMeals = doubleUp
      ? Math.ceil(vegetarianMeals / 2)
      : vegetarianMeals;
    const adjustedNonVegetarianMeals = doubleUp
      ? Math.ceil((totalDays - vegetarianMeals) / 2)
      : totalDays - vegetarianMeals;

    if (
      vegetarianRecipes.length < adjustedVegetarianMeals
      || nonVegetarianRecipes.length < adjustedNonVegetarianMeals
    ) {
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
    const selectedRecipes = [];

    // Loop over each day
    for (let i = 0; i < totalDays; i += 1) {
      // Check if leftovers should be used and it's a leftovers day
      if (doubleUp && i % 2 === 1) {
        selectedRecipes.push(selectedRecipes[selectedRecipes.length - 1]); // Add last recipe again
      } else {
        // Check if a vegetarian meal is required
        if (
          selectedRecipes.filter((recipe) => recipe.isVegetarian).length
          < vegetarianMeals
        ) {
          if (vegetarianRecipes.length > 0) {
            // Add the least recently consumed vegetarian recipe
            selectedRecipes.push(vegetarianRecipes.shift());
          } else {
            // no vegetarian recipes are left, add the least recently consumed non-vegetarian recipe
            selectedRecipes.push(nonVegetarianRecipes.shift());
          }
        } else {
          // If no vegetarian meal is required, add the least recently consumed recipe
          if (nonVegetarianRecipes.length > 0) {
            selectedRecipes.push(nonVegetarianRecipes.shift());
          } else {
            selectedRecipes.push(vegetarianRecipes.shift());
          }
        }
      }
    }

    // Initialize meal plan object
    const mealPlanObj = {
      selectedRecipes, // Array of recipes for the meal plan
      startDate, // Meal plan start date
      endDate, // Meal plan end date
      totalDays, // Duration of meal plan
      doubleUp, // Boolean value whether to double up on meals or not
      vegetarianMeals, // Number of vegetarian meals
      numberOfPeople // Total number of people for the meal
    };

    // Update the state with the new meal plan object
    setMealplan(mealPlanObj);
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
            {mealplan.selectedRecipes.map(({ name, _id }, index) => (
              <div key={hashCode(`${_id}-${index}`)}>
                <h3>{name}</h3>
              </div>
            ))}
            <MealplannerDay dayTitle="Monday" date="24th" recipe={mealplan.selectedRecipes[0]} />
          </div>
        )}
      </Grid>
    </DisplayWrapper>
  );
}
export default Mealplanner;
