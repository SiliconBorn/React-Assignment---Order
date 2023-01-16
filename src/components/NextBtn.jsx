import React from 'react'

const NextBtn = ({dispatch,access}) => {
  const btnClickHandler =()=>{
    if(access()){
      dispatch({
        type:"INCREMENT_STEP",
      })
    }else errorMessage()

  }

  const errorMessage = () => {
    // alert('Fill the form correctly to proceed')
    dispatch({
      type: "SHOW_NOTIFICATION",
      payload: {
        notification: "Fill the form correctly to proceed",
        notificationType: "error",
      },
    });
    let timer = setTimeout(() => {
      dispatch({
        type: "HIDE_NOTIFICATION",
      });
      clearTimeout(timer);
    }, 4000);
  };

  return (
    <div className='btn-container'>
      <button className='next-button btn' onClick={btnClickHandler}>Next</button>
    </div>
  )
}

export default NextBtn