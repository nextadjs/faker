import type { VastDefinition } from "@/definitions";
import { Module } from "@/module";

export class VastModule extends Module {
  public v42(): string {
    return this.ver("4.2");
  }

  public ver(version: string): string {
    return this.helper.selectRandomArrayItem<VastDefinition>(
      this.definitions.creative.vast.filter((vast) => vast.version === version)
    ).vast;
  }
}
