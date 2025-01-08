import type {
  BidRequestV26,
  DeviceV26,
  ImpV26,
  RegsV26,
  SiteV26,
  SourceV26,
  UserV26,
} from "@/types/openrtb";
import { generateRandomArrayItem } from "@/utils/generator";
import { Module } from "@/module";
import type { SiteEntryDefinition } from "@/definitions";

type ContextType = "site";

interface CustomContexts {
  site: SiteV26;
}

export class BidRequestV26Module extends Module {
  private impressionCount: number = 1;
  private _customBidRequest: Partial<BidRequestV26> = {};
  private _context: ContextType = "site";
  private _site: SiteV26 = {};
  private _imp?: Partial<ImpV26>;
  private _device?: DeviceV26;
  private _user?: UserV26;
  private _source?: SourceV26;
  private _regs?: RegsV26;
  private _ext?: Record<string, unknown>;
  private _test: 1 | 0 = 0;
  private _at: number = 2;
  private _tmax?: number;
  private _wseat?: string[];
  private _bseat?: string[];
  private _cur?: string[];
  private _wlang?: string[];
  private _wlangb?: string[];
  private _bcat?: string[];
  private _cattax?: number;
  private _badv?: string[];
  private _bapp?: string[];

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
      if (context === "site") {
        this._site = extension;
      }
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

  public wseat(wseat: string[]): this {
    this._wseat = wseat;
    return this;
  }
  public bseat(bseat: string[]): this {
    this._bseat = bseat;
    return this;
  }

  public cur(cur: string[]): this {
    this._cur = cur;
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
      imp: [...Array(this.impressionCount)].map((_, i) => {
        return {
          id: (i + 1).toString(),
          banner: {
            w: 300,
            h: 250,
          },
          ...this._imp,
        };
      }),
      ...this._customBidRequest,
    };

    if (this._context === "site") {
      bidRequest.site = this.generateSite();
    }

    return this.enrich(bidRequest);
  }

  private generateSite(): SiteV26 {
    const site = generateRandomArrayItem<SiteEntryDefinition>(
      this.definitions.adcom.context.site
    );

    return {
      domain: site.domain,
      page: site.page,
      ...this._site,
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

    bidRequest.test = this._test;
    bidRequest.at = this._at;

    return bidRequest;
  }
}
