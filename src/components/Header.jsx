import React, { useContext } from 'react'
import { OrderFormContext } from './App'

const Header = (props) => {
    console.log(props.currentStep)
    const {orderState} = useContext(OrderFormContext)
  return (
    <div className='common-form-header-container'>
         <div className='common-form-header'>
            <div className='form-header'>
             <div className={`steps step-one ${orderState.currentFormStep===1?'selected':''}`}>Step one</div> 
             <div className={`steps step-two ${orderState.currentFormStep===2?'selected':''}`}>Step Two</div> 
             <div className={`steps step-three ${orderState.currentFormStep===3?'selected':''}`}>Step Three</div> 
             <div className={`steps step-four ${orderState.currentFormStep===4?'selected':''}`}> Step Four</div> 
            </div>
         </div>
    </div>
  )
}

export default Header