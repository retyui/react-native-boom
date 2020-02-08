// @flow
import type { ElementConfig } from "react";
import { Image, View } from "react-native";

export type Source = $ElementType<ElementConfig<typeof Image>, "source">;

export type StyleProp = $ElementType<ElementConfig<typeof View>, "style">;
