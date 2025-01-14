import { Module } from "@/module";
import type {
  AssetResponseV12,
  AssetV12,
  DataResponseV12,
  ImageResponseV12,
  LinkResponseV12,
  NativeResponseV12,
  TitleResponseV12,
  VideoResponseV12,
} from "@/types/openrtb";
import type { ImageAssetType } from "iab-native";

export class NativeModule extends Module {
  public title(): TitleResponseV12 {
    return this.helper.selectRandomArrayItem(
      this.definitions.creative.native.title
    );
  }

  public image(imageAssetType: ImageAssetType): ImageResponseV12 {
    return this.helper.selectRandomArrayItem(
      this.definitions.creative.native.image.filter(
        (image) => image.type === imageAssetType
      )
    );
  }

  public mainImage(): ImageResponseV12 {
    return this.image(3);
  }

  public icon(): ImageResponseV12 {
    return this.image(1);
  }

  public video(): VideoResponseV12 {
    return this.helper.selectRandomArrayItem(
      this.definitions.creative.native.video
    );
  }

  public data(): DataResponseV12 {
    return this.helper.selectRandomArrayItem(
      this.definitions.creative.native.data
    );
  }

  public link(): LinkResponseV12 {
    return {
      url: this.helper.selectRandomArrayItem(
        this.definitions.creative.native.link
      ).url,
    };
  }

  public requestAssets(assets: AssetV12[]): AssetResponseV12[] {
    return assets.map((asset) => {
      const response: AssetResponseV12 = {
        id: asset.id,
        required: asset.required,
      };

      if (asset.title) {
        const title = this.title();
        response.title = title;
      }

      return response;
    });
  }

  public req(
    assets: AssetV12[] = [{ id: 1, title: { len: 90 } }]
  ): NativeResponseV12 {
    return this.request(assets);
  }

  public request(
    assets: AssetV12[] = [{ id: 1, title: { len: 90 } }]
  ): NativeResponseV12 {
    return {
      ver: "1.2",
      link: this.link(),
      assets: this.requestAssets(assets),
    };
  }
}
