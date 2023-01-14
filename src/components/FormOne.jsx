import React, { useContext, useState } from 'react'
import { OrderFormContext } from './App'
import ErrorDisplay from './ErrorDisplay'
import Header from './Header'
import NextBtn from './NextBtn'
const FormOne = () => {
  const {orderState,orderDispatch} = useContext(OrderFormContext)
  const [showError,setShowError] = useState(false)
  console.log(orderState)


  const changeHandler =(type,payload)=>{
   if(!(payload) || payload<orderState.MIN || payload>orderState.MAX){
     setShowError(true)
    }
   else{
    if(showError) setShowError(false)
  }
  orderDispatch({
    type,
    payload
  })
  }
  const valueCheckBeforeStepChange=()=>{
    if(!(orderState.noOfPeople) || orderState.noOfPeople<orderState.MIN || orderState.noOfPeople>orderState.MAX) return false
    return true 
  }

  return (
    <section className='order-first-step'>
     <div className='steps-form-container center'>
      <div className='steps-form'>
      <div className='steps-heading-container'>
        <p className='steps-heading center'>
           MOUTH-WATERING JOURNEY STARTS NOW!!
        </p>
      </div>
        <div className='meal-selection-container'>
          <label htmlFor='mealSelect'>  Select Meal Type</label>
          <select onChange={(e)=>changeHandler("UPDATE_MEAL_TYPE",e.target.value)} name='mealSelect' value={orderState.mealType} required={true}>
            <option value="breakfast">Breakfast</option>
            <option value="lunch">Lunch</option>
            <option value="dinner">Dinner</option>
          </select>
        </div>
        <div className='people-selection-container'>
         
            <label htmlFor='totalPeople'>Enter Number Of People</label>
            <input type='number' required={true} min={orderState.MIN} max={orderState.MAX} name='totalPeople' onChange={(e)=>changeHandler("UPDATE_NO_OF_PEOPLE",e.target.value)} value={orderState.noOfPeople}/>
           { showError && <ErrorDisplay errorMessage={'Enter valid number between 1-10'}/>}
      
        </div>
      </div>
     </div>
     <div className='steps-btn-container'>
      <NextBtn dispatch={orderDispatch} access={valueCheckBeforeStepChange}/>
     </div>
    </section>
  )
}

export default FormOne