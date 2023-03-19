import MainHeader from './main-header/main-header.component';
import Notification from '@/components/notification/notification.component';
import { useContext } from 'react';
import { NotificationContext } from '@/contexts/notification.context';

export default function Layout({ children }) {
  const { notification } = useContext(NotificationContext);

  return (
    <>
      <MainHeader />
      <main>{children}</main>
      {notification && (
        <Notification
          title={notification.title}
          message={notification.message}
          status={notification.status}
        />
      )}
    </>
  );
}
