import { Module } from "@/module";

export class NativeModule extends Module {
  public title(): string {
    return this.helper.selectRandomArrayItem(
      this.definitions.creative.native.title
    ).text;
  }
}
