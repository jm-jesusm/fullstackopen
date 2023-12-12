import React from 'react'
import NOTIFICACION_CODE_ENUM from '../notificationEnum'

const Notification = ({notification}) => {

  const getNotificationClass = () => {
    switch (notification.code) {
      case NOTIFICACION_CODE_ENUM.NONE:
        return 'invisible'
      case NOTIFICACION_CODE_ENUM.CORRECT:
        return 'correct';
      case NOTIFICACION_CODE_ENUM.ERROR:
        return 'error';
      default:
        return '';
    }
  }

  return <p className={`toast ${getNotificationClass()}`}>{notification.message}</p>
}

export default Notification