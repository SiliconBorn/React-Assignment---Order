import React from 'react'

const NextBtn = ({dispatch}) => {
  const btnClickHandler =()=>{
    dispatch({
      type:"INCREMENT_STEP",
    })
  }

  return (
    <div className='btn-container'>
      <button className='next-button' onClick={btnClickHandler}>Next</button>
    </div>
  )
}

export default NextBtn