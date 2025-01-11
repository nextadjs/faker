import type {
  AppV26,
  AssetV12,
  BannerV26,
  BidRequestV26,
  DeviceV26,
  DOOHV26,
  ImpV26,
  NativeV26,
  RegsV26,
  SiteV26,
  SourceV26,
  UserV26,
  VideoV26,
} from "@/types/openrtb";
import { Module } from "@/module";
import type { ModuleConfig } from "@/types";
import { ContextModule } from "@/modules/adcom/context";
import { AgentType, OperatingSystem } from "iab-adcom";

type ContextType = "site" | "app" | "dooh";
type FormatType = BannerFormat | VideoFormat | NativeFormat;

type BannerFormat = {
  type: "banner";
  size: {
    w: number;
    h: number;
  };
  extension?: BannerV26;
};

type VideoFormat = {
  type: "video";
  extension?: Partial<VideoV26>;
};

type NativeFormat = {
  type: "native";
  assets: AssetV12[];
  extension?: Partial<NativeV26>;
};

interface CustomContexts {
  site: SiteV26;
  app: AppV26;
  dooh: DOOHV26;
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

export class BidRequestV26Module extends Module {
  private adComContext: ContextModule;
  private impressionCount: number = -1;
  private _customBidRequest: Partial<BidRequestV26> = {};
  private _context: ContextType = "site";
  private _site: SiteV26 = {};
  private _app: AppV26 = {};
  private _dooh: DOOHV26 = {};
  private _imp?: Partial<ImpV26>;
  private _device?: DeviceV26;
  private _user?: UserV26;
  private _source?: SourceV26;
  private _regs?: RegsV26;
  private _ext?: Record<string, unknown>;
  private _test?: 1 | 0;
  private _at?: number;
  private _tmax?: number;
  private _wseat?: string[];
  private _bseat?: string[];
  private _cur?: string[];
  private _acat?: string[];
  private _wlang?: string[];
  private _wlangb?: string[];
  private _bcat?: string[];
  private _cattax?: number;
  private _badv?: string[];
  private _bapp?: string[];
  private formats: FormatType[] = [];
  private _id?: string;

  public constructor(config: ModuleConfig) {
    super(config);
    this.adComContext = new ContextModule(config);
  }

  public id(id: string): this {
    this._id = id;
    return this;
  }

  public imp(
    countOrCustomImp: number | Partial<ImpV26>,
    customImp?: Partial<ImpV26>
  ): this {
    if (typeof countOrCustomImp === "number") {
      this.impressionCount = countOrCustomImp;

      if (customImp) {
        this._imp = customImp;
      }
    } else {
      this._imp = countOrCustomImp;
    }

    return this;
  }

  public context<T extends keyof CustomContexts>(
    context: T,
    extension?: CustomContexts[T]
  ): this {
    this._context = context;

    if (context === "site") {
      return this.site(extension as SiteV26);
    } else if (context === "app") {
      return this.app(extension as AppV26);
    } else if (context === "dooh") {
      return this.dooh(extension as DOOHV26);
    }

    return this;
  }

  public custom(bidRequest: Record<string, unknown>): this {
    this._customBidRequest = bidRequest;
    return this;
  }

  public site(site?: SiteV26): this {
    this._site = site ? site : this.getFakeSite();
    return this;
  }

  private getFakeSite(): SiteV26 {
    const site = this.adComContext.site();

    return {
      domain: site.domain,
      cattax: site.cattax,
      cat: site.cat,
      pagecat: site.cat,
      page: site.page,
      ref: site.ref,
      publisher: site.pub,
      kwarray: site.kwarray,
      keywords: site.keywords,
    };
  }

  public app(app?: AppV26): this {
    this._app = app ? app : this.getFakeApp();
    console.log(this._app);
    return this;
  }

  private getFakeApp(): AppV26 {
    const app = this.adComContext.app();

    return {
      domain: app.domain,
      bundle: app.bundle,
      storeurl: app.storeurl,
      ver: app.ver,
      cat: app.cat,
      kwarray: app.kwarray,
    };
  }

  public dooh(dooh?: DOOHV26): this {
    this._dooh = dooh ? dooh : this.getFakeDooh();
    return this;
  }

  private getFakeDooh(): DOOHV26 {
    const dooh = this.adComContext.dooh();

    return {
      publisher: dooh.pub,
    };
  }

  public device(device?: DeviceV26): this {
    this._device = device || this.getFakeDevice();

    return this;
  }

  private getFakeDevice(): DeviceV26 {
    const device = this.adComContext.device();

    return {
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
    };
  }

  public user(user?: UserV26): this {
    this._user = user || this.getFakeUser();
    return this;
  }

  private getFakeUser(): UserV26 {
    const user = this.adComContext.user();

    return {
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
      geo: user.geo,
    };
  }

  public source(source: SourceV26): this {
    this._source = source;
    return this;
  }

  public regs(regs?: RegsV26): this {
    this._regs = regs || this.getFakeRegs();
    return this;
  }

  private getFakeRegs(): RegsV26 {
    const regs = this.adComContext.regs();

    return {
      coppa: regs.coppa,
      gdpr: regs.gdpr,
    };
  }

  public ext(ext: Record<string, unknown>): this {
    this._ext = ext;
    return this;
  }

  public at(at: number): this {
    this._at = at;
    return this;
  }

  public tmax(tmax: number): this {
    this._tmax = tmax;
    return this;
  }

  public banner(
    widthOrExtension: number | BannerV26 = 300,
    height: number = 250,
    extension?: BannerV26
  ): this {
    if (typeof widthOrExtension === "number") {
      this.formats.push({
        type: "banner",
        size: {
          w: widthOrExtension,
          h: height,
        },
        extension: extension,
      });
    } else {
      this.formats.push({
        type: "banner",
        size: {
          w: 300,
          h: 250,
        },
        extension: widthOrExtension,
      });
    }

    return this;
  }

  public video(extension: Partial<VideoV26> = {}): this {
    this.formats.push({
      type: "video",
      extension,
    });

    return this;
  }

  public native(
    assetsOrExtension: AssetV12[] | Partial<NativeV26> = [],
    extension?: Partial<NativeV26>
  ): this {
    if (Array.isArray(assetsOrExtension)) {
      this.formats.push({
        type: "native",
        assets: assetsOrExtension,
        extension,
      });
    } else {
      this.formats.push({
        type: "native",
        assets: [],
        extension: assetsOrExtension,
      });
    }

    return this;
  }

  public wseat(wseat: string[]): this {
    this._wseat = wseat;
    return this;
  }

  public enableTestMode(): this {
    this._test = 1;
    return this;
  }

  public bseat(bseat: string[]): this {
    this._bseat = bseat;
    return this;
  }

  public cur(cur: string[] | string): this {
    if (!this._cur) {
      this._cur = Array.isArray(cur) ? cur : [cur];
    } else {
      if (Array.isArray(cur)) {
        this._cur.push(...cur);
      } else {
        this._cur.push(cur);
      }
    }

    return this;
  }

  public usd(): this {
    this.cur("USD");

    return this;
  }

  public jpy(): this {
    this.cur("JPY");
    return this;
  }

  public acat(acat: string[]): this {
    this._acat = acat;
    return this;
  }

  public wlang(wlang: string[]): this {
    this._wlang = wlang;
    return this;
  }

  public wlangb(wlangb: string[]): this {
    this._wlangb = wlangb;
    return this;
  }

  public bcat(bcat: string[]): this {
    this._bcat = bcat;
    return this;
  }

  public cattax(cattax: number): this {
    this._cattax = cattax;
    return this;
  }

  public badv(badv: string[]): this {
    this._badv = badv;
    return this;
  }

  public bapp(bapp: string[]): this {
    this._bapp = bapp;
    return this;
  }

  public test(test: 0 | 1): this {
    this._test = test;
    return this;
  }

  public rectangle(): this {
    this.banner(300, 250);
    return this;
  }

  public leaderboard(): this {
    this.banner(728, 90);
    return this;
  }

  public skyscraper(): this {
    this.banner(160, 600);
    return this;
  }

  public largeMobile(): this {
    this.banner(320, 100);
    return this;
  }

  public mobileBanner(): this {
    this.banner(320, 50);
    return this;
  }

  public ip(): this {
    this._device = {
      ...this._device,
      ip: this.adComContext.deviceFull().ip,
    };
    return this;
  }

  public ipV6(): this {
    this._device = {
      ...this._device,
      ipv6: this.adComContext.deviceFull().ipv6,
    };
    return this;
  }

  public ua(): this {
    this._device = {
      ...this._device,
      ua: this.adComContext.deviceFull().ua,
    };

    return this;
  }

  public create(): BidRequestV26 {
    // TODO: AdCOMでIP, UA系のフェイク情報が生成できるようになり、メソッドを追加したらここで追加発火をする
    const bidRequest = this.minimal();

    return bidRequest;
  }

  public minimal(): BidRequestV26 {
    let bidRequest: BidRequestV26 = {
      id: this.helper.generateUUID(),
      imp: this.generateImps(),
      ...this._customBidRequest,
    };

    bidRequest = this.enrich(bidRequest);

    if (!bidRequest.site || !bidRequest.app || !bidRequest.dooh) {
      this.site();
    }

    return bidRequest;
  }

  private generateImps(): ImpV26[] {
    if (this.impressionCount === -1) {
      let imps: ImpV26[] = [];

      if (this.hasBannerFormatsWithExtension()) {
        imps.push(...this.generateBannerImpsWithExtension());
      }

      if (this.hasBannerFormatsWithoutExtension()) {
        imps.push(this.generateBannerImpWithoutExtension());
      }

      if (this.hasVideoFormats()) {
        imps.push(...this.generateVideoImps());
      }

      if (this.hasNativeFormats()) {
        imps.push(...this.generateNativeImps());
      }

      if (!imps.length) {
        imps.push(this.generateDefaultBannerImp());
      }

      return imps;
    } else {
      return [...Array(this.impressionCount)].map(() => {
        if (this.formats.length) {
          const format = this.helper.selectRandomArrayItem<FormatType>(
            this.formats
          );

          if (format.type === "banner") {
            if (format.extension) {
              return this.generateImp({
                banner: this.generateBannerWithExtension(format),
              });
            } else {
              return this.generateImp(this.generateBannerImpWithoutExtension());
            }
          } else if (format.type === "video") {
            return this.generateImp({
              video: this.generateVideo(format.extension),
            });
          } else if (format.type === "native") {
            return this.generateImp({
              native: this.generateNative(format),
            });
          }
        }

        return this.generateDefaultBannerImp();
      });
    }
  }

  private getBannerFormatsWithExtension(): BannerFormat[] {
    return this.formats.filter(
      (format) => format.type === "banner" && format.extension
    ) as BannerFormat[];
  }

  private hasBannerFormatsWithExtension(): boolean {
    return this.formats.some(
      (format) => format.type === "banner" && format.extension
    );
  }

  private getBannerFormatsWithoutExtension(): BannerFormat[] {
    return this.formats.filter(
      (format) => format.type === "banner" && !format.extension
    ) as BannerFormat[];
  }

  private hasBannerFormatsWithoutExtension(): boolean {
    return this.formats.some(
      (format) => format.type === "banner" && !format.extension
    );
  }

  private hasVideoFormats(): boolean {
    return this.formats.some((format) => format.type === "video");
  }

  private getVideoFormats(): VideoFormat[] {
    return this.formats.filter(
      (format) => format.type === "video"
    ) as VideoFormat[];
  }

  private hasNativeFormats(): boolean {
    return this.formats.some((format) => format.type === "native");
  }

  private getNativeFormats(): NativeFormat[] {
    return this.formats.filter(
      (format) => format.type === "native"
    ) as NativeFormat[];
  }

  private generateVideoImps(): ImpV26[] {
    return this.getVideoFormats().map((videoFormat) => {
      return this.generateImp({
        video: this.generateVideo(videoFormat.extension),
      });
    });
  }

  private generateVideo(extension?: Partial<VideoV26>): VideoV26 {
    return {
      mimes: ["video/mp4"],
      ...extension,
    };
  }

  private generateNativeImps(): ImpV26[] {
    return this.getNativeFormats().map((nativeFormat) => {
      return this.generateImp({
        native: this.generateNative(nativeFormat),
      });
    });
  }

  private generateNative(nativeFormat: NativeFormat): NativeV26 {
    return {
      request: JSON.stringify({
        ver: "1.2",
        assets: nativeFormat.assets,
      }),
      ...nativeFormat.extension,
    };
  }

  private generateDefaultBannerImp(): ImpV26 {
    return this.generateImp({
      banner: {
        w: 300,
        h: 250,
      },
    });
  }

  private generateBannerImpsWithExtension(): ImpV26[] {
    return this.getBannerFormatsWithExtension().map((bannerFormat) => {
      return this.generateImp({
        banner: this.generateBannerWithExtension(bannerFormat),
      });
    });
  }

  private generateBannerImpWithoutExtension(): ImpV26 {
    return this.generateImp({
      banner: {
        format: this.getBannerFormatsWithoutExtension().map((bannerFormat) => ({
          w: bannerFormat.size.w,
          h: bannerFormat.size.h,
        })),
      },
    });
  }

  private generateBannerWithExtension(bannerFormat: BannerFormat): BannerV26 {
    return {
      w: bannerFormat.size.w,
      h: bannerFormat.size.h,
      ...bannerFormat.extension,
    };
  }

  private generateImp(extension: Partial<ImpV26>): ImpV26 {
    let imp: ImpV26 = {
      id: this.helper.generateUUID(),
      ...extension,
    };

    if (this._imp) {
      imp = {
        ...imp,
        ...this._imp,
      };
    }

    return imp;
  }

  private enrich(bidRequest: BidRequestV26): BidRequestV26 {
    if (this._ext) {
      bidRequest.ext = this._ext;
    }

    if (this._device) {
      bidRequest.device = this._device;
    }

    if (this._user) {
      bidRequest.user = this._user;
    }

    if (this._source) {
      bidRequest.source = this._source;
    }

    if (this._regs) {
      bidRequest.regs = this._regs;
    }

    if (this._tmax) {
      bidRequest.tmax = this._tmax;
    }

    if (this._wseat) {
      bidRequest.wseat = this._wseat;
    }

    if (this._bseat) {
      bidRequest.bseat = this._bseat;
    }

    if (this._cur) {
      bidRequest.cur = this._cur;
    }

    if (this._wlang) {
      bidRequest.wlang = this._wlang;
    }

    if (this._wlangb) {
      bidRequest.wlangb = this._wlangb;
    }

    if (this._bcat) {
      bidRequest.bcat = this._bcat;
    }

    if (this._cattax) {
      bidRequest.cattax = this._cattax;
    }

    if (this._badv) {
      bidRequest.badv = this._badv;
    }

    if (this._bapp) {
      bidRequest.bapp = this._bapp;
    }

    if (this._acat) {
      bidRequest.acat = this._acat;
    }

    if (this._test) {
      bidRequest.test = this._test;
    }

    if (this._at) {
      bidRequest.at = this._at;
    }

    if (this._id) {
      bidRequest.id = this._id;
    }

    if (this._site) {
      bidRequest.site = this._site;
    }

    if (this._dooh) {
      bidRequest.dooh = this._dooh;
    }

    if (this._app) {
      bidRequest.app = this._app;
    }

    return bidRequest;
  }
}
