/* eslint-disable no-unused-vars */
import React, { useContext, useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import {
  TextField,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Grid,
  Container
} from "@mui/material";
import { useAuth } from "../../shared/context/AuthContext";
import LoadingSpinner from "../../shared/components/LoadingSpinner";
import useHttpClient from "../../shared/hooks/http-hook";
import "react-datepicker/dist/react-datepicker.css";
import DisplayWrapper from "../../shared/components/DisplayWrapper";
import RecipesContext from "../../shared/context/RecipesContext";

function Mealplanner() {
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

  const onChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  const generateMealplan = () => {
    console.log("burh");
  };

  const handleNumberOfPeopleChange = (e) => {
    const { value } = e.target;
    if (value >= 1 && value <= 20) {
      setNumberOfPeople(value);
    }
  };

  return (
    <DisplayWrapper>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <h2>Mealplanner</h2>
        </Grid>
        <Grid item xs={12}>
          <DatePicker
            selected={startDate}
            onChange={onChange}
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
            onChange={(e) => setNumberOfPeople(e.target.value)}
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
            onChange={(e) => setVegetarianMeals(e.target.value)}
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
