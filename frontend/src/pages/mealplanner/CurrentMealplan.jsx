import React, { useEffect, useState } from "react";
import MealplannerDay from "../../components/Mealplanner/MealplannerDay";
import DisplayWrapper from "../../shared/components/DisplayWrapper";
import { hashCode } from "../../shared/utils/hashCode";

function CurrentMealplan() {
  // eslint-disable-next-line no-unused-vars
  const [currentMealplan, setCurrentMealplan] = useState([]);

  // This would typically come from an API call.
  useEffect(() => {
    // Fetch current meal plan here and update the state.
  }, []);

  return (
    <DisplayWrapper>
      <h1>Current Meal Plan</h1>
      <div className="current-mealplan">
        {currentMealplan.map((meal) => (
          <MealplannerDay
            key={hashCode(meal.dayTitle + meal.dayNumber + meal.recipe.title)}
            dayTitle={meal.dayTitle}
            dayNumber={meal.dayNumber}
            recipe={meal.recipe}
          />
        ))}

      </div>
    </DisplayWrapper>
  );
}

export default CurrentMealplan;
