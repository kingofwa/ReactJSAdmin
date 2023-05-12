import React, { useState, useEffect } from "react";
import {
  getUserNotifications,
  getNotifications
} from "@services/notifications";
import { useAuth } from "@contexts/auth";
import { useRouter } from "next/router";

export const NotificationContext = React.createContext();

export const NotificationProvider = ({ children }) => {
  const auth = useAuth();
  const router = useRouter();
  const [isBell, setBell] = useState(false);

  const fetchNotifications = async () => {
    const systemNotification = await getNotifications();
    const countSystemNotificationUnread =
      systemNotification.extra.current_status.unread_count;
    const userNotification = await getUserNotifications();
    const countUserNotificationUnread =
      userNotification.extra.current_status.unread_count;
    if (countSystemNotificationUnread || countUserNotificationUnread) {
      setBell(true);
    } else {
      setBell(false);
    }
    return countSystemNotificationUnread + countUserNotificationUnread;
  };

  const checkNotifications = () => fetchNotifications();

  useEffect(() => {
    if (auth?.isLoggedIn) {
      fetchNotifications();
    }
  }, [router.asPath]);

  return (
    <NotificationContext.Provider value={{ isBell, checkNotifications }}>
      {children}
    </NotificationContext.Provider>
  );
};
