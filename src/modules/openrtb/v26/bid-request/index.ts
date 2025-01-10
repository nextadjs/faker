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
import type {
  AppEntryDefinition,
  DoohEntryDefinition,
  SiteEntryDefinition,
} from "@/definitions";

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

export class BidRequestV26Module extends Module {
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

    if (extension) {
      const contextMap: Record<keyof CustomContexts, (ext: any) => void> = {
        site: (ext: SiteV26) => (this._site = ext),
        app: (ext: AppV26) => (this._app = ext),
        dooh: (ext: DOOHV26) => (this._dooh = ext),
      };

      contextMap[context](extension);
    }

    return this;
  }

  public custom(bidRequest: Record<string, unknown>): this {
    this._customBidRequest = bidRequest;
    return this;
  }

  public site(site?: SiteV26): this {
    return this.context("site", site || {});
  }

  public app(app?: AppV26): this {
    return this.context("app", app || {});
  }

  public dooh(dooh?: DOOHV26): this {
    return this.context("dooh", dooh || {});
  }

  public device(device: DeviceV26): this {
    this._device = device;
    return this;
  }

  public user(user: UserV26): this {
    this._user = user;
    return this;
  }

  public source(source: SourceV26): this {
    this._source = source;
    return this;
  }

  public regs(regs: RegsV26): this {
    this._regs = regs;
    return this;
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
  public bseat(bseat: string[]): this {
    this._bseat = bseat;
    return this;
  }

  public cur(cur: string[] | string): this {
    this._cur = Array.isArray(cur) ? cur : [cur];
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

  public minimal(): BidRequestV26 {
    const bidRequest: BidRequestV26 = {
      id: this.helper.generateUUID(),
      imp: this.generateImps(),
      ...this._customBidRequest,
    };

    if (this._context === "site") {
      bidRequest.site = this.generateSite();
    } else if (this._context === "app") {
      bidRequest.app = this.generateApp();
    } else if (this._context === "dooh") {
      bidRequest.dooh = this.generateDooh();
    }

    return this.enrich(bidRequest);
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

  private generateSite(): SiteV26 {
    const site = this.helper.selectRandomArrayItem<SiteEntryDefinition>(
      this.definitions.adcom.context.site
    );

    return {
      domain: site.domain,
      page: site.page,
      ...this._site,
    };
  }

  private generateApp(): AppV26 {
    const app = this.helper.selectRandomArrayItem<AppEntryDefinition>(
      this.definitions.adcom.context.app
    );

    return {
      domain: app.domain,
      ...this._app,
    };
  }

  private generateDooh(): DOOHV26 {
    const dooh = this.helper.selectRandomArrayItem<DoohEntryDefinition>(
      this.definitions.adcom.context.dooh
    );

    return {
      venuetypetax: dooh.venuetypetax,
      venuetype: dooh.venuetype,
      domain: dooh.domain,
      ...this._dooh,
    };
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

    return bidRequest;
  }
}
