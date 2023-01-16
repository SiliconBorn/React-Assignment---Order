import React from 'react'

const NotificationDisplay = ({notificationToDisplay,notificationType,animate}) => {
  return (
    <p className={`notification ${animate?"animate":"hide"} ${notificationType==="error"?"error":"success"}`}>
      {notificationToDisplay}
    </p>
  )
}

export default NotificationDisplay