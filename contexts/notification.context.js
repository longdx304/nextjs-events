const { createContext, useState, useEffect } = require('react');

export const NotificationContext = createContext({
  notification: null, //{ title, message, status }
  showNotification: function () {},
  hideNotification: function () {},
});

export function NotificationProvider({ children }) {
  const [notification, setNotification] = useState();

  useEffect(() => {
    if (
      notification &&
      (notification.status === 'success' || notification.status === 'error')
    ) {
      const timer = setTimeout(() => {
        setNotification(null);
      }, 3000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [notification]);

  function showNotification(notificationData) {
    setNotification(notificationData);
  }

  function hideNotification() {
    setNotification(null);
  }

  const context = { notification, showNotification, hideNotification };

  return (
    <NotificationContext.Provider value={context}>
      {children}
    </NotificationContext.Provider>
  );
}
