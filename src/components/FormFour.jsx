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
    <section className='order-first-step'>
      <div className='steps-header-container'>
     <Header currentStep={orderState.currentFormStep}/>
      </div>
     <div className='steps-form-container'>
      <div className='steps-form'>
        <div className=''></div>
      </div>
     </div>
     <div className='steps-btn-container'>
      <PrevBtn dispatch={orderDispatch}/>
      <div className='btn-container'>
        <button className='submit-btn' onClick={submitClickHandler}>Submit</button>
      </div>
     </div>
    </section>
  )
}

export default FormFour