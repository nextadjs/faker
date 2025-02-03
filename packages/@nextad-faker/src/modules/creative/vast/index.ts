import type { VastDefinition } from "@/definitions";
import { Module } from "@/module";
import type { AudioVideoCreativeSubtype } from "iab-adcom";

export class VastModule extends Module {
  public v42(): string {
    return this.ver("4.2");
  }

  public subType(subType: AudioVideoCreativeSubtype): string {
    return this.helper.selectRandomArrayItem<VastDefinition>(
      this.definitions.creative.vast.filter((vast) => vast.subType === subType)
    ).vast;
  }

  public ver(version: string): string {
    return this.helper.selectRandomArrayItem<VastDefinition>(
      this.definitions.creative.vast.filter((vast) => vast.version === version)
    ).vast;
  }
}
