import { Module } from "@/module";
import type {
  AssetResponseV12,
  AssetV12,
  LinkResponseV12,
  NativeResponseV12,
} from "@/types/openrtb";

export class NativeModule extends Module {
  public title(): string {
    return this.helper.selectRandomArrayItem(
      this.definitions.creative.native.title
    ).text;
  }

  public link(): LinkResponseV12 {
    return {
      url: this.helper.selectRandomArrayItem(
        this.definitions.creative.native.link
      ).url,
    };
  }

  public reqAssets(assets: AssetV12[]): AssetResponseV12[] {
    return assets.map((asset) => {
      const response: AssetResponseV12 = {
        id: asset.id,
        required: asset.required,
      };

      if (asset.title) {
        const title = this.title();
        response.title = {
          len: title.length,
          text: this.title(),
        };
      }

      return response;
    });
  }

  public req(
    assets: AssetV12[] = [{ id: 1, title: { len: 90 } }]
  ): NativeResponseV12 {
    return {
      ver: "1.2",
      link: this.link(),
      assets: this.reqAssets(assets),
    };
  }
}
