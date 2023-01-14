import React from 'react'

const NextBtn = ({dispatch,access}) => {
  const btnClickHandler =()=>{
    if(access()){
      dispatch({
        type:"INCREMENT_STEP",
      })
    }else errorMessage()

  }

  const errorMessage =()=>{
    alert('Fill the form correctly to proceed')
  }

  return (
    <div className='btn-container'>
      <button className='next-button btn' onClick={btnClickHandler}>Next</button>
    </div>
  )
}

export default NextBtn