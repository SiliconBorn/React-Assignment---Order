import React, { useContext } from 'react'
import { OrderFormContext } from './App'

const Header = (props) => {
    const {orderState} = useContext(OrderFormContext)
  return (
    <div className='common-form-header-container'>
         <div className='common-form-header'>
            <div className='form-header'>
             <div className={`steps center step-one ${orderState.currentFormStep===1?'selected':''}`}>Step One</div> 
             <div className={`steps center step-two ${orderState.currentFormStep===2?'selected':''}`}>Step Two</div> 
             <div className={`steps  center step-three ${orderState.currentFormStep===3?'selected':''}`}>Step Three</div> 
             <div className={`steps center end step-four ${orderState.currentFormStep===4?'selected':''}`}>Review</div> 
            </div>
         </div>
    </div>
  )
}

export default Header