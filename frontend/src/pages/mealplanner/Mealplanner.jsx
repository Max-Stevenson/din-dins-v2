import React from "react";
import { Link } from "react-router-dom";
import { Grid, Paper, Typography } from "@mui/material";
import DisplayWrapper from "../../shared/components/DisplayWrapper";
import "./Mealplanner.scss";

function MealplannerPage() {
  return (
    <DisplayWrapper>
      <Grid className="mealplanner-page" container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Link className="mealplanner-tile__current-mealplan" to="/mealplanner/current">
            <Paper elevation={3} className="mealplanner-page__tile">
              <Typography variant="h5">Current Mealplan</Typography>
            </Paper>
          </Link>

        </Grid>
        <Grid item xs={12} sm={6}>
          <Link className="mealplanner-tile__new-mealplan" to="/mealplanner/new">
            <Paper elevation={3} className="mealplanner-page__tile">
              <Typography variant="h5">New Mealplan</Typography>
            </Paper>
          </Link>
        </Grid>
      </Grid>
    </DisplayWrapper>
  );
}

export default MealplannerPage;
