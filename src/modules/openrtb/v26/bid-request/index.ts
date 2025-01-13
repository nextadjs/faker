import { BidRequestBuilderV26 } from "@/libraries/builder";
import { Module } from "@/module";
import { ContextModule } from "@/modules/adcom/context";
import type { ModuleConfig } from "@/types";
import type {
  BannerV26,
  BidRequestV26,
  ImpV26,
  NativeV26,
  VideoV26,
} from "@/types/openrtb";
import { DeviceType } from "iab-adcom";
import type { NativeRequest } from "iab-native";

export class BidRequestV26Module extends Module {
  private builder: BidRequestBuilderV26;
  private adComContext: ContextModule;

  public constructor(config: ModuleConfig) {
    super(config);
    this.builder = new BidRequestBuilderV26();
    this.adComContext = new ContextModule(config);
  }

  public imp(imp?: Partial<ImpV26>): this {
    this.builder.addImp(imp);
    return this;
  }

  public withCommonImp(imp: Partial<ImpV26>): this {
    this.builder.withCommonImp(imp);
    return this;
  }

  public web(): this {
    const adComFakeSite = this.adComContext.site();

    this.builder.withSite({
      domain: adComFakeSite.domain,
      cattax: adComFakeSite.cattax,
      cat: adComFakeSite.cat,
      pagecat: adComFakeSite.cat,
      page: adComFakeSite.page,
      ref: adComFakeSite.ref,
      publisher: adComFakeSite.pub,
      kwarray: adComFakeSite.kwarray,
      keywords: adComFakeSite.keywords,
    });

    return this;
  }

  public app(): this {
    const app = this.adComContext.app();

    this.builder.withApp({
      domain: app.domain,
      bundle: app.bundle,
      storeurl: app.storeurl,
      ver: app.ver,
      cat: app.cat,
      kwarray: app.kwarray,
    });

    return this;
  }

  public dooh(): this {
    const dooh = this.adComContext.dooh();

    this.builder.withDOOH({
      publisher: dooh.pub
    });

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

  public mobile(): this {
    this.builder.withDevice({
      devicetype: DeviceType.MOBILE_TABLET,
    });
    return this;
  }

  public desktop(): this {
    this.builder.withDevice({
      devicetype: DeviceType.PERSONAL_COMPUTER,
    });

    return this;
  }

  public tablet(): this {
    this.builder.withDevice({
      devicetype: DeviceType.TABLET,
    });

    return this;
  }

  public chrome(): this {
    this.builder.withDevice({
      ua: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    });

    return this;
  }

  public safari(): this {
    this.builder.withDevice({
      ua: "ozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.2 Safari/605.1.15",
    });

    return this;
  }

  public firefox(): this {
    this.builder.withDevice({
      ua: "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:122.0) Gecko/20100101 Firefox/122.0",
    });

    return this;
  }

  public edge(): this {
    this.builder.withDevice({
      ua: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36 Edg/120.0.0.0",
    });

    return this;
  }

  public android(): this {
    const androidVersion = this.helper.generateRandomDecimal(4, 13, 1);

    this.builder.withDevice({
      os: "Android",
      osv: androidVersion.toString(),
    });

    return this;
  }

  public ios(): this {
    this.builder.withDevice({
      os: "iOS",
      osv: this.helper.generateRandomDecimal(7, 15, 1).toString(),
    });

    return this;
  }

  public macos(): this {
    const macVersion = this.helper.generateRandomDecimal(10, 14, 1);
    this.builder.withDevice({
      os: "macOS",
      osv: macVersion.toString(),
    });

    return this;
  }

  public windows(): this {
    const windowsVersions = [
      "6.1", // Windows 7
      "6.2", // Windows 8
      "6.3", // Windows 8.1
      "10.0", // Windows 10
      "11.0", // Windows 11
    ];

    this.builder.withDevice({
      os: "Windows",
      osv: this.helper.selectRandomArrayItem<string>(windowsVersions),
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
