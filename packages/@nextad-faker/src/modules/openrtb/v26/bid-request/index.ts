import { BidRequestBuilderV26 } from "@/libraries/builder";
import { Module } from "@/module";
import { ContextModule } from "@/modules/adcom/context";
import type { ModuleConfig } from "@/types";
import type {
  AppV26,
  BannerV26,
  BidRequestV26,
  DeviceV26,
  DOOHV26,
  GeoV26,
  ImpV26,
  NativeV26,
  RegsV26,
  SiteV26,
  SourceV26,
  UserV26,
  VideoV26,
} from "@/types/openrtb";
import { AgentType, DeviceType, OperatingSystem } from "iab-adcom";
import type { NativeRequest } from "iab-native";

export class BidRequestV26Module extends Module {
  private builder: BidRequestBuilderV26;
  private adComContext: ContextModule;

  public constructor(config: ModuleConfig) {
    super(config);
    this.builder = new BidRequestBuilderV26();
    this.adComContext = new ContextModule(config);
  }

  public setBuilder(bidRequestBuilderV26: BidRequestBuilderV26): this {
    this.builder = bidRequestBuilderV26;
    return this;
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
    this.withSite();
    return this;
  }

  public app(): this {
    this.withApp();

    return this;
  }

  public dooh(): this {
    this.withDOOH();

    return this;
  }

  public usa(): this {
    this.builder.withGeo({
      country: "US",
      utcoffset: -5, // EST
    });
    return this;
  }

  public japan(): this {
    this.builder.withGeo({
      country: "JP",
      utcoffset: 9, // JST
    });
    return this;
  }

  public uk(): this {
    this.builder.withGeo({
      country: "GB",
      utcoffset: 0, // GMT/UTC
    });
    return this;
  }

  public germany(): this {
    this.builder.withGeo({
      country: "DE",
      utcoffset: 1, // CET
    });
    return this;
  }

  public france(): this {
    this.builder.withGeo({
      country: "FR",
      utcoffset: 1, // CET
    });
    return this;
  }

  public australia(): this {
    this.builder.withGeo({
      country: "AU",
      utcoffset: 10, // AEST
    });
    return this;
  }

  public china(): this {
    this.builder.withGeo({
      country: "CN",
      utcoffset: 8, // CST
    });
    return this;
  }

  public canada(): this {
    this.builder.withGeo({
      country: "CA",
      utcoffset: -5, // EST (Toronto)
    });
    return this;
  }

  public india(): this {
    this.builder.withGeo({
      country: "IN",
      utcoffset: 5.5, // IST
    });
    return this;
  }

  public brazil(): this {
    this.builder.withGeo({
      country: "BR",
      utcoffset: -3, // BRT
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

  public firstPrice(): this {
    this.builder.withAuctionType(1);

    return this;
  }

  public secondePrice(): this {
    this.builder.withAuctionType(2);

    return this;
  }

  public withId(id: string): this {
    this.builder.withId(id);
    return this;
  }

  public addImp(props?: Partial<ImpV26>): this {
    this.builder.addImp(props);
    return this;
  }

  public withSite(site?: Partial<SiteV26>): this {
    if (site) {
      this.builder.withSite(site);
    } else {
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
    }

    return this;
  }

  public withApp(app?: Partial<AppV26>): this {
    if (app) {
      this.builder.withApp(app);
    } else {
      const app = this.adComContext.app();

      this.builder.withApp({
        domain: app.domain,
        bundle: app.bundle,
        storeurl: app.storeurl,
        ver: app.ver,
        cat: app.cat,
        kwarray: app.kwarray,
      });
    }

    return this;
  }

  public withDOOH(dooh?: Partial<DOOHV26>): this {
    if (dooh) {
      this.builder.withDOOH(dooh);
    } else {
      const dooh = this.adComContext.dooh();

      this.builder.withDOOH({
        publisher: dooh.pub,
      });
    }

    return this;
  }

  public withDevice(device?: Partial<DeviceV26>): this {
    if (device) {
      this.builder.withDevice(device);
    } else {
      const device = this.adComContext.device();

      this.builder.withDevice({
        ip: device.ip,
        ipv6: device.ipv6,
        dnt: device.dnt ? 1 : 0,
        devicetype: device.type,
        make: device.make,
        model: device.model,
        os: operatingSystemMap[
          (device.os as OperatingSystem) || OperatingSystem.OTHER
        ],
        osv: device.osv,
        hwv: device.hwv,
        w: device.w,
        h: device.h,
        js: device.js ? 1 : 0,
        ppi: device.ppi,
        pxratio: device.pxratio,
        language: device.lang,
        langb: device.langb,
        carrier: device.carrier,
      });
    }

    return this;
  }

  public withUser(user?: Partial<UserV26>): this {
    if (user) {
      this.builder.withUser(user);
    } else {
      const user = this.adComContext.user();

      this.builder.withUser({
        id: user.id,
        buyeruid: user.buyeruid,
        keywords: user.keywords,
        kwarray: user.kwarray,
        consent: user.consent,
        eids: (user.eids || []).map((eid) => ({
          source: eid.source || "",
          uids: (eid.uids || []).map((uid) => ({
            id: uid.id || "",
            atype: uid.atype || AgentType.BROWSER_OR_DEVICE,
            ext: uid.ext,
          })),
        })),
      });
    }

    return this;
  }

  public withTest(test: 0 | 1): this {
    this.builder.withTest(test);
    return this;
  }

  public withAuctionType(at: number): this {
    this.builder.withAuctionType(at);
    return this;
  }

  public withTimeout(tmax: number): this {
    this.builder.withTimeout(tmax);

    return this;
  }

  public withWhitelistedSeats(wseat: string[]): this {
    this.builder.withWhitelistedSeats(wseat);
    return this;
  }

  public withBlockedSeats(bseat: string[]): this {
    this.builder.withBlockedSeats(bseat);
    return this;
  }

  public withAllImps(allimps: 0 | 1): this {
    this.builder.withAllImps(allimps);
    return this;
  }

  public withCurrencies(cur: string[]): this {
    this.builder.withCurrencies(cur);
    return this;
  }

  public withLanguages(wlang: string[]): this {
    this.builder.withLanguages(wlang);
    return this;
  }

  public withLanguagesBCP47(wlangb: string[]): this {
    this.builder.withLanguagesBCP47(wlangb);
    return this;
  }

  public withAllowedCategories(acat: string[]): this {
    this.builder.withAllowedCategories(acat);
    return this;
  }

  public withBlockedCategories(bcat: string[]): this {
    this.builder.withBlockedCategories(bcat);
    return this;
  }

  public withCategoryTaxonomy(cattax: number): this {
    this.builder.withCategoryTaxonomy(cattax);
    return this;
  }

  public withBlockedAdvertisers(badv: string[]): this {
    this.builder.withBlockedAdvertisers(badv);
    return this;
  }

  public withBlockedApps(bapp: string[]): this {
    this.builder.withBlockedApps(bapp);
    return this;
  }

  public withSource(source: SourceV26): this {
    this.builder.withSource(source);
    return this;
  }

  public withRegulations(regs: RegsV26): this {
    this.builder.withRegulations(regs);

    return this;
  }

  public withExt(ext: Record<string, unknown>): this {
    this.builder.withExt(ext);
    return this;
  }

  public withGeo(geo?: Partial<GeoV26>): this {
    if (geo) {
      this.builder.withGeo(geo);
    } else {
      const geo = this.adComContext.geo();

      this.builder.withGeo({
        lat: geo.lat,
        lon: geo.lon,
        type: geo.type,
        accuracy: geo.accur,
        lastfix: geo.lastfix,
        ipservice: geo.ipserv,
        country: geo.country,
        region: geo.region,
        metro: geo.metro,
        city: geo.city,
        zip: geo.zip,
        utcoffset: geo.utcoffset,
      });
    }

    return this;
  }

  public minimal(): BidRequestV26 {
    const bidRequest = this.builder.build();
    this.builder.reset();
    return bidRequest;
  }

  public make(): BidRequestV26 {
    const bidRequest = this.builder.build();
    this.builder.reset();
    return bidRequest;
  }
}

export const operatingSystemMap: Record<OperatingSystem, string> = {
  [OperatingSystem.OTHER]: "Other",
  [OperatingSystem.THREE_DS]: "3DS",
  [OperatingSystem.ANDROID]: "Android",
  [OperatingSystem.APPLE_TV]: "Apple TV",
  [OperatingSystem.ASHA]: "Asha",
  [OperatingSystem.BADA]: "Bada",
  [OperatingSystem.BLACKBERRY]: "BlackBerry",
  [OperatingSystem.BREW]: "BREW",
  [OperatingSystem.CHROME_OS]: "ChromeOS",
  [OperatingSystem.DARWIN]: "Darwin",
  [OperatingSystem.FIRE_OS]: "FireOS",
  [OperatingSystem.FIREFOX_OS]: "FirefoxOS",
  [OperatingSystem.HELEN_OS]: "HelenOS",
  [OperatingSystem.IOS]: "iOS",
  [OperatingSystem.LINUX]: "Linux",
  [OperatingSystem.MAC_OS]: "MacOS",
  [OperatingSystem.MEEGO]: "MeeGo",
  [OperatingSystem.MORPH_OS]: "MorphOS",
  [OperatingSystem.NET_BSD]: "NetBSD",
  [OperatingSystem.NUCLEUS_PLUS]: "NucleusPLUS",
  [OperatingSystem.PS_VITA]: "PS Vita",
  [OperatingSystem.PS3]: "PS3",
  [OperatingSystem.PS4]: "PS4",
  [OperatingSystem.PSP]: "PSP",
  [OperatingSystem.SYMBIAN]: "Symbian",
  [OperatingSystem.TIZEN]: "Tizen",
  [OperatingSystem.WATCH_OS]: "WatchOS",
  [OperatingSystem.WEB_OS]: "WebOS",
  [OperatingSystem.WINDOWS]: "Windows",
};
