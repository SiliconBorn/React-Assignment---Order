import React, { useContext } from 'react'
import { Form } from 'react-bootstrap'
import { OrderFormContext } from './App'
import Header from './Header'
import NextBtn from './NextBtn'
const FormOne = () => {
  const {orderState,orderDispatch} = useContext(OrderFormContext)
  console.log(orderState)

  const selectHandler =(e)=>{
    console.log(e.target.value)
  }

  return (
    <section className='order-first-step'>
      <div className='steps-header-container'>
     <Header currentStep={orderState.currentFormStep}/>
      </div>
     <div className='steps-form-container'>
      <div className='steps-form'>
        <div className='meal-selection-container'>
          <label for ='mealSelect'>  Please select a meal</label>
          <Form.Select onChange={selectHandler} name='mealSelect'>
            <option value="lunch">Lunch</option>
            <option value="breakfast">Breakfast</option>
            <option value="dinner">Dinner</option>
          </Form.Select>
        </div>
        <div className='people-selection-container'>
         
            <label for ='totalPeople'> Please  enter number of people</label>
            <input type='number' min={1} max={10} name='totalPeople'/>
      
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