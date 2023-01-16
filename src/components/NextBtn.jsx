import React from 'react'

const NextBtn = (props) => {
  const {dispatch,access} = props
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
        notification: props.errMessage?props.errMessage:"Fill the form correctly to proceed",
        notificationType: "error",
      },
    });
    let timer = setTimeout(() => {
      dispatch({
        type: "HIDE_NOTIFICATION",
      });
      clearTimeout(timer);
    }, 6000);
  };

  return (
    <div className='btn-container'>
      <button className='next-button btn' onClick={btnClickHandler}>Next</button>
    </div>
  )
}

export default NextBtn