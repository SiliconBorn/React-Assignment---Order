import React, { useContext } from 'react'
import { OrderFormContext } from './App'
import Header from './Header'
import NextBtn from './NextBtn'
import PrevBtn from './PrevBtn'

const FormThree = () => {
  const {orderState,orderDispatch} = useContext(OrderFormContext)
  console.log(orderState)

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
      <NextBtn dispatch={orderDispatch}/>
     </div>
    </section>
  )
}

export default FormThree