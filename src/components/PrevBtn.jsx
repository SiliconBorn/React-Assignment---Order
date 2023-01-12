import React from 'react'

const PrevBtn = ({dispatch}) => {
  const btnClickHandler =()=>{
    dispatch({
      type:"DECREMENT_STEP",
    })
  }
    return (
        <div className='btn-container'>
          <button className='prev-button' onClick={btnClickHandler}>Previous</button>
        </div>
      )
}

export default PrevBtn