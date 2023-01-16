import React, { useContext, useState, useEffect } from "react";
import { OrderFormContext } from "./App";
import NextBtn from "./NextBtn";
import PrevBtn from "./PrevBtn";
import PlusIcon from "./PlusIcon";
import RemoveBtn from "./removeBtn";

const FormThree = () => {
  /*REQ. STATES*/
  const { orderState, orderDispatch, dishesData } =
    useContext(OrderFormContext);
  const [allAvailableDishes] = useState(() => {
    const dishesAvailable = dishesData.dishes.reduce(
      (dishesAvailable, current) => {
        if (current.restaurant.includes(orderState.selectedRestaurant)) {
          dishesAvailable = [
            ...dishesAvailable,
            { name: current.name, id: current.id },
          ];
        }
        return dishesAvailable;
      },
      []
    );
    return dishesAvailable;
  });
  const [selectedDishes, setSelectedDishes] = useState(
    orderState.selectedDishes.length > 0 ? orderState.selectedDishes : []
  );

  /*REQ. SIDE-EFFECTS*/
  useEffect(() => {
  
      orderDispatch({
        type: "UPDATE_SELECTED_DISHES",
        payload: selectedDishes,
      });
 
  }, [selectedDishes]);

  /*REQ. FUNCTIONS*/
  //FUNCTION TO ADD NEW DISHES
  const addDishBtnHandler = () => {
    let dishNotAddedYet;
    if (selectedDishes.length === 0) {
      dishNotAddedYet = allAvailableDishes[0];
    } else if (selectedDishes.length < allAvailableDishes.length) {
      dishNotAddedYet = allAvailableDishes.filter(
        (available) =>
          !selectedDishes.find(
            (selected) => selected.dish.name === available.name
          )
      )[0];
    } else {
      orderDispatch({
        type: "SHOW_NOTIFICATION",
        payload: {
          notification: "No more dishes available to add",
          notificationType: "error",
        },
      });
      let timer = setTimeout(() => {
        orderDispatch({
          type: "HIDE_NOTIFICATION",
        });
        clearTimeout(timer);
      }, 4000);
      // alert("no more dishes available to add");
      return;
    }
    setSelectedDishes([
      ...selectedDishes,
      { dish: dishNotAddedYet, servings: 1 },
    ]);
  };

  //FUNCTION TO HANDLE DISH SELECTION
  const selectHandler = (e, dishToupdateId, dishToupdateName) => {
    const dishToAddName = e.target.value;
    let dishAlreadySelected = false;
    if (selectedDishes.length > 0) {
      dishAlreadySelected = selectedDishes.some(
        (dishObj) => dishObj.dish.name === dishToAddName
      );
    }

    if (dishAlreadySelected) {
      orderDispatch({
        type: "SHOW_NOTIFICATION",
        payload: {
          notification:
            "Dish already selected. Please increase the servings ,if same dish is needed",
          notificationType: "error",
        },
      });
      let timer = setTimeout(() => {
        orderDispatch({
          type: "HIDE_NOTIFICATION",
        });
        clearTimeout(timer);
      }, 4000);
      // alert(
      //   "dish already selected. Please increase the servings ,if same dish is needed"
      // );
      setSelectedDishes([...selectedDishes]);
      return false;
    } else {
      const updatedSelectedDishes = selectedDishes.map((selectedDish) => {
        if (
          selectedDish.dish.id === dishToupdateId &&
          selectedDish.dish.name === dishToupdateName
        ) {
          let dishToAdd = allAvailableDishes.find(
            (dish) => dish.name === dishToAddName
          );
          let updatedCurrentDish = { ...selectedDish, dish: dishToAdd };
          return updatedCurrentDish;
        }
        return selectedDish;
      });
      setSelectedDishes([...updatedSelectedDishes]);
    }
  };

  //FUNCTION TO HANDLE PER DISH SERVINGS CHANGES
  const servingsChangeHandler = (e, dishToupdateId, dishToupdateName) => {
    const selectedServings = Number(e.target.value);
    const updatedSelectedDishes = selectedDishes.map((selectedDish) => {
      if (
        selectedDish.dish.id === dishToupdateId &&
        selectedDish.dish.name === dishToupdateName
      ) {
        let updatedCurrentDish = {
          ...selectedDish,
          servings: selectedServings,
        };
        return updatedCurrentDish;
      }
      return selectedDish;
    });
    setSelectedDishes([...updatedSelectedDishes]);
  };

  //FUNCTION TO REMOVE SELECTED DISH
  const removeDish =(dishIndex)=>{
    const updatedSelectedDishes = selectedDishes.filter((dish,i)=>i!==dishIndex)
    setSelectedDishes([...updatedSelectedDishes]) 
  }

  //FUNCTION TO VALIDATE INPUT FROM SELECT ELEMENTS BEFORE PROCEEDING TO NEXT STEP
  const valueCheckBeforeStepChange = () => {
    if (
      selectedDishes.length > 0 &&
      orderState.selectedDishes.length > 0 &&
      selectedDishes.length === orderState.selectedDishes.length
    ) {
      const totalDishesCount = selectedDishes.reduce(
        (totalDishesCount, currentDish) => {
          totalDishesCount += currentDish.servings;
          return totalDishesCount;
        },
        0
      );
      if (totalDishesCount >= orderState.noOfPeople) {
        return true;
      } else return false;
    } else return false;
  };

  return (
    <section className="order-third-step">
      <div className="steps-form-container">
        <div className="steps-form" style={{ fontSize: "13px" }}>
        <div className="dishes-select-header-portion center">
        <div className='dishes-select-header-container'>
          <p className="'dishes-select-header">
            { orderState.selectedDishes.length===0?"ADD HEAVENLY DISHES":"ADDED DELICIOUSNESS"}
          </p>
        </div>
      </div>
          <div className="selected-dishes-container">
            {selectedDishes.length > 0 &&
              selectedDishes.map((selectedDish, index) => {
                return (
                  <div className="selected-dish-container">
                    <div className="dish-selection-container">
                      <label htmlFor="dishSelect"> Select Your Choice</label>
                      <select
                        onChange={(e) =>
                          selectHandler(
                            e,
                            selectedDish.dish.id,
                            selectedDish.dish.name
                          )
                        }
                        name="dishSelect"
                        value={selectedDish.dish.name}
                      >
                        {allAvailableDishes.map((dish, index) => {
                          return (
                            <>
                              <option
                                value={dish.name}
                                key={`${index}-${dish.name}-${dish.id}`}
                              >
                                {dish.name}
                              </option>
                            </>
                          );
                        })}
                      </select>
                    </div>
                    <div className="serving-selection-container">
                      <label htmlFor="totalServings"> Servings</label>
                      <input
                        type="number"
                        className="servings"
                        min={orderState.MIN}
                        max={orderState.MAX}
                        name="totalServings"
                        value={selectedDish.servings}
                        onChange={(e) =>
                          servingsChangeHandler(
                            e,
                            selectedDish.dish.id,
                            selectedDish.dish.name
                          )
                        }
                        onClick={(e) => (
                          e.preventDefault(), e.currentTarget.blur()
                        )}
                      />
                    </div>
                    <div className="remove-dish-btn-container" onClick={()=>removeDish(index)}>
                      <RemoveBtn/>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
        <div className="add-dishes-btn-container">
          <button className="add-dish-btn" onClick={addDishBtnHandler}>
            <PlusIcon />
            Add dish
          </button>
        </div>
      </div>
      <div className="double steps-btn-container">
        <PrevBtn dispatch={orderDispatch} />
        <NextBtn dispatch={orderDispatch} access={valueCheckBeforeStepChange} />
      </div>
    </section>
  );
};

export default FormThree;
