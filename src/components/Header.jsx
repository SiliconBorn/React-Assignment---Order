import React from 'react'

const Header = (props) => {
    console.log(props.currentStep)
  return (
    <div className='common-form-header-container'>
         <div className='common-form-header'>
            <div className='form-header'>
             <div className={`steps step-one ${props.currentStep===1?'selected':''}`}>Step one</div> 
             <div className={`steps step-two ${props.currentStep===2?'selected':''}`}>Step Two</div> 
             <div className={`steps step-three ${props.currentStep===3?'selected':''}`}>Step Three</div> 
             <div className={`steps step-four ${props.currentStep===4?'selected':''}`}> Step Four</div> 
            </div>
         </div>
    </div>
  )
}

export default Header