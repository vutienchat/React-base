import NotificationContext from 'contexts/Notification';
import { useContext } from 'react';

const useNotification = () => {
  const context = useContext(NotificationContext);

  if (!context) {
    throw new Error('Forgot to wrap component in NotificationProvider');
  }

  return context;
};

export default useNotification;
