// // @flow
// import messaging from '@react-native-firebase/messaging';
//
//
// import { DOWNLOAD_CHANNEL_ID, PLAYER_CHANNEL_ID } from "./consts";
//
// const { Android } = messaging();
//
// const downloadChannel = new Android.Channel(
//   DOWNLOAD_CHANNEL_ID,
//   "Download progress",
//   Android.Importance.Low
// )
//   .enableLights(false)
//   .enableVibration(false);
//
// const playerChannel = new Android.Channel(
//   PLAYER_CHANNEL_ID,
//   "Music Player",
//   Android.Importance.Low
// );
//
// const createChannel = ch => firebase.notifications().android.createChannel(ch);
//
// createChannel(downloadChannel);
// createChannel(playerChannel);
