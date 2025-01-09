import type { AudioVideoCreativeSubtype } from "iab-adcom";

export type CreativeDefinition = {
  display: DisplayDefinition[];
  vast: VastDefinition[];
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
