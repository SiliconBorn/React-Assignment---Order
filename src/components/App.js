import React, { useReducer } from "react";
import "../style.css";
import FormOne from "./FormOne";
import FormTwo from "./FormTwo";
import FormThree from "./FormThree";
import FormFour from "./FormFour";
import Header from "./Header";
import NotificationDisplay from "./NotificationDisplay";
const dishesData = require("../data/dishes.json");
export const OrderFormContext = React.createContext();

/*REQ. GLOBAL STATE*/
const initialState = {
  currentFormStep: 1,
  mealType: "breakfast",
  noOfPeople: 1,
  selectedRestaurant: "",
  selectedDishes: [],
  notification:"",
  notificationType:"",
  showNotification:false,
  MIN: 1,
  MAX: 10,
};

/*REQ. GLOBAL REDUCER*/
const reducer = (state, action) => {
  switch (action.type) {
    case "INCREMENT_STEP":
      return {
        ...state,
        currentFormStep: state.currentFormStep + 1,
      };

    case "DECREMENT_STEP":
      return {
        ...state,
        currentFormStep: state.currentFormStep - 1,
      };
    case "UPDATE_MEAL_TYPE":
      return {
        ...state,
        mealType: action.payload,
      };

    case "UPDATE_NO_OF_PEOPLE":
      return {
        ...state,
        noOfPeople: action.payload,
      };
    case "UPDATE_SELECTED_RESTAURANT":
      return {
        ...state,
        selectedRestaurant: action.payload,
        selectedDishes: [],
      };
    case "UPDATE_SELECTED_DISHES":
      return {
        ...state,
        selectedDishes: [...action.payload],
      };   
      
    case "SHOW_NOTIFICATION":
      return {
        ...state,
        notification:action.payload.notification,
        notificationType:action.payload.notificationType,
        showNotification:true,

      }
      case "HIDE_NOTIFICATION":
        return {
          ...state,
          notification:"",
          notificationType:"",
          showNotification:false,
  
        }
      
    default:
      return state;
  }
};

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <OrderFormContext.Provider
      value={{ orderState: state, orderDispatch: dispatch, dishesData }}
    >
     {state.showNotification && <NotificationDisplay notificationToDisplay={state.notification} notificationType={state.notificationType} animate={state.showNotification}/>}
      <section className="order-form-container">
        <div className="order-form">
          <div className="steps-header-container">
            <Header />
          </div>
          <div className="main-form">
            {state.currentFormStep !== 1 ? (
              state.currentFormStep !== 2 ? (
                state.currentFormStep !== 3 ? (
                  <FormFour />
                ) : (
                  <FormThree />
                )
              ) : (
                <FormTwo />
              )
            ) : (
              <FormOne />
            )}
          </div>
        </div>
      </section>
    </OrderFormContext.Provider>
  );
};

export default App;
