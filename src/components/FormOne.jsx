import React, { useContext } from 'react'
import { OrderFormContext } from './App'
import Header from './Header'
const FormOne = () => {
  const {orderState,orderDispatch} = useContext(OrderFormContext)
  console.log(orderState)

  return (
    <div>
     <Header currentStep={orderState.currentFormStep}/>
    </div>
  )
}

export default FormOne