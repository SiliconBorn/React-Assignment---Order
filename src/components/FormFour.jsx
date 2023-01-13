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
    <div className='body-cards-portion  flex justify-center ' style={{fontFamily:` ${'Zen Dots'}` }}>
        <div className='cards-container'>
            <div className='cards'>
                        <div className='card relative p-5 rounded-2xl bg-white duration-700 cursor-pointer h-80 w-64 shadow-cust'>
                            <h3 className='card-title'>{"yyy"}</h3>
                            <p className='card-description'>{"loorermere"}</p>
                            <button className='card-btn'>{"knjdkfsdf"}</button>
                        </div>
            </div>

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