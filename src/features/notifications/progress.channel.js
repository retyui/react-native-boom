// @flow
// import firebase from "react-native-firebase";

import { DOWNLOAD_CHANNEL_ID } from "./consts";

// const notifications = firebase.notifications();
// const { Notification, Android } = firebase.notifications;
// const { Priority, Category } = Android;

type Options = {|
  current: number,
  max: number,
  title: string,
  getBody: ({| current: number, max: number |}) => string
|};

type NotificationController = {|
  show: () => Promise<any>,
  close: () => Promise<any>,
  updateProgress: (current: number) => Promise<any>
|};

export const createProgressPushNotificationChannel = ({
  current,
  max,
  title,
  getBody
}: Options): NotificationController => {
  // $FlowFixMe
  // const localNotification = new Notification().android
  //   .setChannelId(DOWNLOAD_CHANNEL_ID)
  //   // .android.setOngoing(true) // не закрываемое сообщение
  //   .android.setPriority(Priority.Min)
  //   .android.setProgress(max, current, false)
  //   .android.setOnlyAlertOnce(true)
  //   .android.setCategory(Category.Transport)
  //   .setTitle(title)
  //   .setBody(
  //     getBody({
  //       current,
  //       max
  //     })
  //   );
  //
  // const { notificationId } = localNotification;
  //
  // const close = () => notifications.removeDeliveredNotification(notificationId);
  // const show = () => notifications.displayNotification(localNotification);
  // const updateProgress = (current: number): Promise<any> => {
  //   if (current > max) {
  //     return close();
  //   }
  //
  //   localNotification.android.setProgress(max, current, false).setBody(
  //     getBody({
  //       current,
  //       max
  //     })
  //   );
  //
  //   return notifications.displayNotification(localNotification);
  // };
  return {
    close() {},
    show() {},
    updateProgress() {}
  };
};
