import type { AudioVideoCreativeSubtype } from "iab-adcom";
import type {
  TitleResponse,
  ImageResponse,
  VideoResponse,
  DataResponse,
} from "iab-native";

export type CreativeDefinition = {
  display: DisplayDefinition[];
  vast: VastDefinition[];
  native: NativeDefinition;
};

export type DisplayDefinition = {
  markup: string;
  size: {
    w: number;
    h: number;
  };
};

export type VastDefinition = {
  vast: string;
  version: string;
  subType: AudioVideoCreativeSubtype;
  size: {
    w: number;
    h: number;
  };
};

export type NativeDefinition = {
  title: NativeTitleDefinition[];
  image: NativeImageDefinition[];
  video: NativeVideoDefinition[];
  data: NativeDataDefinition[];
};

export type NativeTitleDefinition = TitleResponse;
export type NativeImageDefinition = ImageResponse;
export type NativeVideoDefinition = VideoResponse;
export type NativeDataDefinition = DataResponse;
