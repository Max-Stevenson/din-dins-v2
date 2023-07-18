import React from "react";
import PropTypes from "prop-types";
import {
  Card, CardMedia, CardContent, Typography
} from "@mui/material";
import "./MealplannerDay.scss";

function MealplannerDay({ dayTitle, date, recipe }) {
  return (
    <Card className="mealplanner-day">
      <CardContent className="mealplanner-day__content">
        <Typography variant="h5" className="mealplanner-day__day-title">{dayTitle}</Typography>
        <Typography variant="subtitle1" className="mealplanner-day__date">{date}</Typography>
        <Typography variant="h6" className="mealplanner-day__recipe-title">{recipe.name}</Typography>
      </CardContent>
      {recipe.image && (
        <CardMedia
          component="img"
          className="mealplanner-day__image"
          alt={recipe.name}
          height="140"
          image={recipe.image}
        />
      )}
    </Card>
  );
}

MealplannerDay.propTypes = {
  dayTitle: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  recipe: PropTypes.shape({
    name: PropTypes.string,
    image: PropTypes.string
  }).isRequired
};

export default MealplannerDay;
