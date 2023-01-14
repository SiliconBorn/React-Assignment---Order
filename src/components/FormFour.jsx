import React, { useContext } from "react";
import { OrderFormContext } from "./App";
import PrevBtn from "./PrevBtn";

const FormFour = () => {
  /*REQ. STATES*/
  const { orderState, orderDispatch } = useContext(OrderFormContext);

  /*REQ. FUNCTIONS*/
  //FUNTIONS TO HANDLE SUBMIT BTN CLICK
  const submitClickHandler = () => {
    console.log({
      mealType: orderState.mealType,
      noOfPeople: orderState.noOfPeople,
      Restaurant: orderState.selectedRestaurant,
      dishes: orderState.selectedDishes,
    });
  };
  return (
    <section className="order-fourth-step">
      <div className="final-order-header-portion">
        <div className='final-order-header-container'>
          <p className="'final-order-header">
            FINAL ORDER SUMMARY
          </p>
        </div>
      </div>
      <div className="body-cards-portion ">
        <div className="final-order-card-container">
          <div className="final-order-card">
            <div className="final-selected-meal-type-container">
              <span className="meal-type-label">Meal</span>
              <span className="meal-type-content">{orderState.mealType}</span>
            </div>
            <div className="final-selected-no-of-people-container">
              <span className="no-of-people-label">Number of People</span>
              <span className="no-of-people-content">
                {orderState.noOfPeople}
              </span>
            </div>
            <div className="final-selected-restaurant-container">
              <span className="selected-restaurant-label">Restaurant</span>
              <span className="selected-restaurant-label">
                {orderState.selectedRestaurant}
              </span>
            </div>
            {orderState.selectedDishes.length > 0 && (
              <div className="final-selected-dishes-container">
                <span className="selected-dishes-label">Dishes</span>
                <div className="selected-dishes-content">
                  {orderState.selectedDishes.length > 0 &&
                    orderState.selectedDishes.map((selectedDish) => {
                      return (
                        <>
                          <span className="selected-dish">
                            <p className="dish-name">
                              {selectedDish.dish.name}
                            </p>
                            <p className="servings-amount">
                              {selectedDish.servings}
                            </p>
                          </span>
                        </>
                      );
                    })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="double steps-btn-container">
        <PrevBtn dispatch={orderDispatch} />
        <div className="btn-container">
          <button className="submit-btn btn" onClick={submitClickHandler}>
            Submit
          </button>
        </div>
      </div>
    </section>
  );
};

export default FormFour;
