import React, { useContext } from 'react'
import { Form } from 'react-bootstrap'
import { OrderFormContext } from './App'
import Header from './Header'
import NextBtn from './NextBtn'
const FormOne = () => {
  const {orderState,orderDispatch} = useContext(OrderFormContext)
  console.log(orderState)


  const changeHandler =(type,payload)=>{
    console.log(payload)
    console.log(type)
    orderDispatch({
      type,
      payload
    })
  }

  return (
    <section className='order-first-step'>
     <div className='steps-form-container center'>
      <div className='steps-form'>
        <div className='meal-selection-container'>
          <label htmlFor='mealSelect'>  Please select a meal</label>
          <select onChange={()=>changeHandler("UPDATE_MEAL_TYPE",e.target.value)} name='mealSelect' defaultValue={orderState.mealType}>
            <option value="breakfast">Breakfast</option>
            <option value="lunch">Lunch</option>
            <option value="dinner">Dinner</option>
          </select>
        </div>
        <div className='people-selection-container'>
         
            <label htmlFor='totalPeople'> Please  enter number of people</label>
            <input type='number' min={1} max={10} name='totalPeople' onChange={()=>changeHandler("UPDATE_NO_OF_PEOPLE",e.target.value)} defaultValue={orderState.noOfPeople}/>
      
        </div>
      </div>
     </div>
     <div className='steps-btn-container'>
      <NextBtn dispatch={orderDispatch}/>
     </div>
    </section>
  )
}

export default FormOne