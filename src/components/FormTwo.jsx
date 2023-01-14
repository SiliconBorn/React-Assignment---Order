import React, { useContext, useState } from "react";
import { useEffect } from "react";
import { OrderFormContext } from "./App";
import NextBtn from "./NextBtn";
import PrevBtn from "./PrevBtn";

const FormTwo = () => {
  /*REQ. STATES*/
  const { orderState, orderDispatch, dishesData } =
    useContext(OrderFormContext);
  const [allAvailableRestaurants] = useState(() => {
    const restaurantsAvailable = dishesData.dishes.reduce(
      (restaurantsAvailable, current) => {
        if (
          current.availableMeals.includes(orderState.mealType) &&
          !restaurantsAvailable.includes(current.restaurant)
        ) {
          restaurantsAvailable = [...restaurantsAvailable, current.restaurant];
        }
        return restaurantsAvailable;
      },
      []
    );
    return restaurantsAvailable;
  });

  /*REQ. SIDE-EFFECT*/
  useEffect(() => {
    if (!orderState.selectedRestaurant) {
      orderDispatch({
        type: "UPDATE_SELECTED_RESTAURANT",
        payload: allAvailableRestaurants[0],
      });
    }
  }, []);

  /*REQ. FUNCTIONS*/
  //FUNCTION TO HANDLE CHANGES IN SELECT ELEMENT
  const selectHandler = (e) => {
    orderDispatch({
      type: "UPDATE_SELECTED_RESTAURANT",
      payload: e.target.value,
    });
  };

  return (
    <section className="order-second-step">
      <div className="steps-form-container center">
        <div className="steps-form">
        <div className="restaurant-select-header-portion center">
        <div className='restaurant-select-header-container'>
          <p className="'restaurant-select-header">
            SOURCE OF HAPPINESS
          </p>
        </div>
      </div>
          <div className="meal-selection-container">
            <label htmlFor="mealSelect">Select Your Desired Restaurant</label>
            <select
              onChange={selectHandler}
              required={true}
              name="mealSelect"
              value={
                orderState.selectedRestaurant
                  ? orderState.selectedRestaurant
                  : allAvailableRestaurants[0]
              }
            >
              {allAvailableRestaurants.map((restaurant, index) => {
                return (
                  <>
                    <option value={restaurant} key={`${index}-${restaurant}`}>
                      {restaurant}
                    </option>
                  </>
                );
              })}
            </select>
          </div>
        </div>
      </div>
      <div className=" double steps-btn-container">
        <PrevBtn dispatch={orderDispatch} />
        <NextBtn dispatch={orderDispatch} access={() => true} />
      </div>
    </section>
  );
};

export default FormTwo;
