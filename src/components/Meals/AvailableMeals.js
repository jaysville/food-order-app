import Card from "../UI/Card";
import classes from "./AvailableMeals.module.css";
import MealItem from "./MealItem";
import axios from "axios";
import { useEffect, useState } from "react";

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(null);

  const getMeals = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        "https://food-order-app-d915a-default-rtdb.firebaseio.com/meals.json"
      );
      if (!response.statusText) {
        throw new Error("Something went wrong");
      }
      const loadedMeals = [];

      for (const key in response.data) {
        loadedMeals.push({
          id: key,
          name: response.data[key].name,
          price: response.data[key].price,
          description: response.data[key].description,
        });
      }
      setMeals(loadedMeals);
    } catch (err) {
      setHttpError(err.message);
      console.log(err);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    getMeals();
  }, []);

  if (httpError) {
    return (
      <section className={classes.mealsError}>
        <p>{httpError}</p>
      </section>
    );
  }
  const mealsList = meals.map(({ id, name, description, price }) => {
    return (
      <MealItem
        key={id}
        name={name}
        id={id}
        description={description}
        price={price}
      />
    );
  });
  return (
    <>
      {isLoading ? (
        <p className={classes.loading}>Loading......</p>
      ) : (
        <section className={classes.meals}>
          <Card>
            <ul>{mealsList}</ul>
          </Card>
        </section>
      )}
    </>
  );
};
export default AvailableMeals;
