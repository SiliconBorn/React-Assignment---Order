import React, { useContext } from 'react'
import { OrderFormContext } from './App'

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
    </section>
  )
}

export default FormThree