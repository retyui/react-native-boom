// @flow
import { Platform } from "react-native";
import { createAction } from "redux-actions";

import { setRoot } from "../navigation/actions";
import { HOME_SCENE, MY_AUDIO_SCENE } from "./consts/scenes";

export const setRootToHome = () =>
  setRoot({
    root: {
      bottomTabs: {
        children: [
          {
            component: {
              name: MY_AUDIO_SCENE,
              options: {
                bottomTab: {
                  text: "Мои Аудио",
                  icon: require("./img/main_my_music.png")
                }
              }
            }
          },
          {
            component: {
              name: HOME_SCENE,
              options: {
                bottomTab: {
                  text: "Главная",
                  icon: require("./img/main_feed.png")
                }
              }
            }
          },
          {
            component: {
              name: HOME_SCENE,
              options: {
                bottomTab: {
                  text: "Лента",
                  icon: require("./img/main_feed_social.png")
                }
              }
            }
          },
          {
            component: {
              name: HOME_SCENE,
              options: {
                bottomTab: {
                  text: "Поиск",
                  icon: require("./img/main_search.png")
                }
              }
            }
          }
          // {
          //   component: {
          //     name: MY_AUDIO_SCENE,
          //     options: {
          //       bottomTab: {
          //         text: "Мои Аудио",
          //         icon: require("./img/main_my_music.png")
          //       }
          //     }
          //   }
          // }
        ]
      }
    }
  });
