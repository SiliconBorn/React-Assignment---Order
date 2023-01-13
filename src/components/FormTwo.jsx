import React, { useContext, useState } from 'react'
import { useEffect } from 'react';
import { Form } from 'react-bootstrap'
import { OrderFormContext } from './App'
import Header from './Header'
import NextBtn from './NextBtn'
import PrevBtn from './PrevBtn'

const FormTwo = () => {
  const {orderState,orderDispatch,dishesData} = useContext(OrderFormContext)
  const [allAvailableRestaurants] = useState(()=>{
     const restaurantsAvailable = dishesData.dishes.reduce((restaurantsAvailable,current)=>{
      if(current.availableMeals.includes(orderState.mealType) && !(restaurantsAvailable.includes(current.restaurant)) ){
         restaurantsAvailable = [...restaurantsAvailable,current.restaurant]
      }
      return restaurantsAvailable
     },[])
     return restaurantsAvailable
  })

  useEffect(()=>{
     if(!orderState.selectedRestaurant){
      orderDispatch({
        type:"UPDATE_SELECTED_RESTAURANT",
        payload:allAvailableRestaurants[0]
      })
     }
  },[])
  const selectHandler=(e)=>{
    console.log(e.target.value)

    orderDispatch({
      type:"UPDATE_SELECTED_RESTAURANT",
      payload:e.target.value
    })
  }

  return (
    <section className='order-second-step'>
      <div className='steps-form-container'>
      <div className='steps-form'>
        <div className='meal-selection-container'>
          <label htmlFor='mealSelect'>  Please select a meal</label>
          <Form.Select onChange={selectHandler} name='mealSelect' defaultValue={orderState.selectedRestaurant?orderState.selectedRestaurant:allAvailableRestaurants[0]}>
            {
              allAvailableRestaurants.map((restaurant,index)=>{
                return(
                  <>
                  <option value={restaurant} key={`${index}-${restaurant}`}>{restaurant}</option>
                  </>
                )
              })
            }
          </Form.Select>
        </div>
      </div>
     </div>
     <div className=' double steps-btn-container'>
      <PrevBtn dispatch={orderDispatch}/>
      <NextBtn dispatch={orderDispatch}/>
     </div>
    </section>
  )
}

export default FormTwo