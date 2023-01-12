import React, { useReducer } from 'react'
import '../style.css'
import FormOne from './FormOne'
import FormTwo from './FormTwo'
import FormThree from './FormThree'
import FormFour from './FormFour'
export const OrderFormContext = React.createContext()
const initialState = {
  currentFormStep:1,
  mealType:'',
  noOfPeople:null,
  selectedRestaurant:'',
  selectedDishes:[]
}

const reducer = (state,action)=>{

  switch(action.type){

    case "INCREMENT_STEP":
      return {
        ...state,
        currentFormStep:state.currentFormStep + 1
      }

      case "DECREMENT_STEP":
        return {
          ...state,
          currentFormStep:state.currentFormStep - 1 
        }
    case "UPDATE_MEAL_TYPE":
      break;
      case "UPDATE_NO_OF_PEOPLE":
        break;
        case "UPDATE_SELECTED_RESTAURANT":
          break;
          case "UPDATE_SELECTED_DISHES":
            break;
            default:
              return state
  }
}

const App = () => {
  const [state,dispatch] = useReducer(reducer,initialState)
  return (
    <OrderFormContext.Provider value={{orderState:state,orderDispatch:dispatch}}>

      <div>
        {
          state.currentFormStep!==1 ?
           state.currentFormStep!==2?
           state.currentFormStep!==3?
           <FormFour/>:
           <FormThree/>:
           <FormTwo/>:
           <FormOne/>
        }
      </div>
    </OrderFormContext.Provider>
  )
}

export default App