import { Module } from "@/module";

export class BannerModule extends Module {
  public s300x250(): string {
    return this.helper.selectRandomArrayItem<string>(
      this.definitions.creative.banner.filter(
        (banner) => banner.size === "300x250"
      )
    ).markup;
  }
}
