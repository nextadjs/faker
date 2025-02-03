import type { DataResponseV12, ImageResponseV12, LinkResponseV12, TitleResponseV12, VideoResponseV12 } from "@/types/openrtb";
import type { AudioVideoCreativeSubtype } from "iab-adcom";

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
  link: NativeLinkDefinition[];
};

export type NativeTitleDefinition = TitleResponseV12;
export type NativeImageDefinition = ImageResponseV12;
export type NativeVideoDefinition = VideoResponseV12;
export type NativeDataDefinition = DataResponseV12;
export type NativeLinkDefinition = LinkResponseV12;