import { BidRequestBuilderV26 } from "@/libraries/builder";
import { Module } from "@/module";
import type { ModuleConfig } from "@/types";
import type {
  BannerV26,
  BidRequestV26,
  ImpV26,
  NativeV26,
  VideoV26,
} from "@/types/openrtb";
import type { Asset, NativeRequest } from "iab-native";

export class BidRequestV26Module extends Module {
  private builder: BidRequestBuilderV26;

  public constructor(config: ModuleConfig) {
    super(config);
    this.builder = new BidRequestBuilderV26();
  }

  public imp(imp?: ImpV26): this {
    this.builder.addImp(imp);
    return this;
  }

  public banner(
    widthOrSizes?: number | [number, number][],
    heightOrOptions?: number | Partial<BannerV26>,
    options?: Partial<BannerV26>
  ): this {
    if (Array.isArray(widthOrSizes) && typeof heightOrOptions !== "number") {
      this.builder.addImp({
        banner: {
          format: widthOrSizes.map((size) => ({
            w: size[0],
            h: size[1],
          })),
          ...heightOrOptions,
        },
      });
    } else {
      const width = typeof widthOrSizes === "number" ? widthOrSizes : 300;
      const height =
        typeof heightOrOptions === "number" ? heightOrOptions : 250;

      this.builder.addImp({
        banner: {
          w: width,
          h: height,
          ...options,
        },
      });
    }

    return this;
  }

  public video(options?: Partial<VideoV26>): this {
    this.builder.addImp({
      video: {
        mimes: ["video/mp4"],
        ...options,
      },
    });

    return this;
  }

  public native(request: NativeRequest, options?: Partial<NativeV26>): this {
    this.builder.addImp({
      native: {
        request: JSON.stringify(request),
        ...options,
      },
    });

    return this;
  }

  public minimal(): BidRequestV26 {
    return this.builder.build();
  }

  public make(): BidRequestV26 {
    return this.builder.build();
  }
}
