import React, { useContext } from 'react'
import { OrderFormContext } from './App'
import Header from './Header'
import PrevBtn from './PrevBtn'

const FormFour = () => {
  const {orderState,orderDispatch} = useContext(OrderFormContext)
  console.log(orderState)

  const submitClickHandler=()=>{
        console.log(orderState)
  }
  return (
    <section className='order-fourth-step'>
    <div className='body-cards-portion  flex justify-center'>
        <div className='card-container'>
            {/* currentFormStep:4,
  mealType:'breakfast',
  noOfPeople:null,
  selectedRestaurant:'',
  selectedDishes:[] */}
                        <div className='card relative p-5 rounded-2xl bg-white duration-700 cursor-pointer h-80 w-64 shadow-cust'>
                           <div className='meal-type-container'>
                            <span className='meal-type-label'>Meal</span>
                            <span className='meal-type-content'>{orderState.mealType}</span>
                           </div>
                           <div className='no-of-people-container'>
                            <span className='no-of-people-label'>Number of People</span>
                            <span className='no-of-people-content'>{orderState.noOfPeople}</span>
                           </div>
                           <div className='selected-restaurant-container'>
                           <span className='selected-restaurant-label'>Restaurant</span>
                           <span className='selected-restaurant-label'>{orderState.selectedRestaurant}</span>
                           </div>
                           <div className='selected-dishes-container'>
                           <span className='selected-dishes-label'>Dishes</span>
                           <div className='selected-dishes-content'>
                            <ul>
                            {
                                 orderState.selectedDishes.length>0 && orderState.selectedDishes.map((selectedDish)=>{
                                  return(
                                    <li>
                                      <span>
                                        <p className='dish-name'>{selectedDish.dish.name}</p>
                                        <p className='servings-amount'>{selectedDish.servings}</p></span>
                                    </li>
                                  )
                                 })
                            }
                            </ul>
                           </div>

                           </div>
                        </div>
        </div>
    </div>
     <div className='double steps-btn-container'>
      <PrevBtn dispatch={orderDispatch}/>
      <div className='btn-container'>
        <button className='submit-btn btn' onClick={submitClickHandler}>Submit</button>
      </div>
     </div>
    </section>
  )
}

export default FormFour