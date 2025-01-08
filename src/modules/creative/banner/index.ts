import type { BannerDefinition } from "@/definitions";
import { Module } from "@/module";

export class BannerModule extends Module {
  public s300x250(): string {
    return this.helper.selectRandomArrayItem<BannerDefinition>(
      this.definitions.creative.banner.filter(
        (banner) => banner.size === "300x250"
      )
    ).markup;
  }

  public s336x280(): string {
    return this.helper.selectRandomArrayItem<BannerDefinition>(
      this.definitions.creative.banner.filter(
        (banner) => banner.size === "336x280"
      )
    ).markup;
  }

  public s728x90(): string {
    return this.helper.selectRandomArrayItem<BannerDefinition>(
      this.definitions.creative.banner.filter(
        (banner) => banner.size === "728x90"
      )
    ).markup;
  }

  public s160x600(): string {
    return this.helper.selectRandomArrayItem<BannerDefinition>(
      this.definitions.creative.banner.filter(
        (banner) => banner.size === "160x600"
      )
    ).markup;
  }

  public s300x600(): string {
    return this.helper.selectRandomArrayItem<BannerDefinition>(
      this.definitions.creative.banner.filter(
        (banner) => banner.size === "300x600"
      )
    ).markup;
  }

  public s320x50(): string {
    return this.helper.selectRandomArrayItem<BannerDefinition>(
      this.definitions.creative.banner.filter(
        (banner) => banner.size === "320x50"
      )
    ).markup;
  }

  public s320x100(): string {
    return this.helper.selectRandomArrayItem<BannerDefinition>(
      this.definitions.creative.banner.filter(
        (banner) => banner.size === "320x100"
      )
    ).markup;
  }
}
