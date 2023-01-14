import React from 'react'

const ErrorDisplay = (props) => {
  return (
    <p className='error-message'>
        {props.errorMessage}
    </p>
  )
}

export default ErrorDisplay