// // @flow
// import firebase from "react-native-firebase";
// import { name as appName } from "../../app.json";
//
// const CHANNEL_ID = "default_notification_channel_id";
// const channel = new firebase.notifications.Android.Channel(
//   CHANNEL_ID, // android/app/src/main/res/values/strings.xml
//   appName,
//   firebase.notifications.Android.Importance.Max
// ).setDescription("Notification channel");
//
// firebase.notifications().android.createChannel(channel);
//
// export default async (message: Object): Promise<void> => {
//   try {
//     const text = message.data.message;
//     const payload = JSON.parse(message.data.sendbird);
//
//     // $FlowFixMe
//     const localNotification = new firebase.notifications.Notification().android
//       .setPriority(firebase.notifications.Android.Priority.High)
//       .setChannelId("com.myesentai.default_channel_id")
//       .setNotificationId(message.messageId)
//       .setTitle("New message")
//       .setSubtitle(`Unread message: `)
//       .setBody(text)
//       .setData(payload);
//
//     return await firebase
//       .notifications()
//       .displayNotification(localNotification);
//   } catch (e) {
//     return undefined;
//   }
// };
