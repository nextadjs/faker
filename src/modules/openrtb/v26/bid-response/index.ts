import { Module } from "@/module";
import { DisplayModule } from "@/modules/creative/display";
import { VastModule } from "@/modules/creative/vast";
import type { BidResponseV26, BidV26 } from "@/types/openrtb";
import { AudioVideoCreativeSubtype } from "iab-adcom";
import { NoBidReasonCode } from "iab-openrtb/v26";

type BannerFormat = {
  w: number;
  h: number;
  extension?: Partial<BidV26>;
};

type VideoFormat = {
  subType: AudioVideoCreativeSubtype;
  extension?: Partial<BidV26>;
};

export class BidResponseV26Module extends Module {
  private seatBidCount: number = 1;
  private bidCount: number = 1;
  private _impId?: string | string[];
  private bannerFormats: BannerFormat[] = [];
  private videoFormats: VideoFormat[] = [];
  private _id?: string;
  private _bidid?: string;
  private _cur?: string;
  private _customdata?: string;
  private _ext?: Record<string, unknown>;

  public id(id: string): this {
    this._id = id;
    return this;
  }

  public bidid(bidId: string): this {
    this._bidid = bidId;
    return this;
  }

  public cur(cur: string): this {
    this._cur = cur;
    return this;
  }

  public customdata(customdata: string): this {
    this._customdata = customdata;
    return this;
  }

  public ext(ext: Record<string, unknown>): this {
    this._ext = ext;
    return this;
  }

  public seatbid(seatBidCount: number): this {
    this.seatBidCount = seatBidCount;
    return this;
  }

  public bid(bidCount: number): this {
    this.bidCount = bidCount;
    return this;
  }

  public impId(impId: string | string[]): this {
    this._impId = impId;
    return this;
  }

  public banner(
    widthOrExtension: number | Partial<BidV26> = 300,
    height: number = 250,
    extension?: Partial<BidV26>
  ): this {
    if (typeof widthOrExtension === "number") {
      this.bannerFormats.push({
        w: widthOrExtension,
        h: height,
        extension: extension,
      });
    } else {
      this.bannerFormats.push({
        w: 300,
        h: 250,
        extension: widthOrExtension,
      });
    }
    return this;
  }

  public video(
    subTypeOrExtension:
      | AudioVideoCreativeSubtype
      | Partial<BidV26> = AudioVideoCreativeSubtype.VAST_4_2,
    extension: Partial<BidV26> = {}
  ): this {
    if (typeof subTypeOrExtension === "number") {
      this.videoFormats.push({
        subType: subTypeOrExtension,
        extension: extension,
      });
    } else {
      this.videoFormats.push({
        subType: AudioVideoCreativeSubtype.VAST_4_2,
        extension: subTypeOrExtension,
      });
    }

    return this;
  }

  public nbr(
    noBidReasonCode: NoBidReasonCode = NoBidReasonCode.UNKNOWN_ERROR
  ): BidResponseV26 {
    return this.enrich({
      id: this.helper.generateUUID(),
      nbr: noBidReasonCode,
    });
  }

  public minimal(): BidResponseV26 {
    return this.enrich({
      id: this.helper.generateUUID(),
      seatbid: [...Array(this.seatBidCount)].map((_, __) => {
        return {
          bid: [...Array(this.bidCount)].map((_) => {
            return this.generateBid();
          }),
          seat: this.helper.selectRandomArrayItem<string>(
            this.definitions.openrtb.bidResponse.seat
          ),
        };
      }),
    });
  }

  private getImpId(): string {
    if (!this._impId) {
      return this.helper.generateUUID();
    } else if (typeof this._impId === "string") {
      return this._impId;
    } else {
      return (
        this.helper.selectRandomArrayItem<string>(this._impId) ||
        this.helper.generateUUID()
      );
    }
  }

  private generateBid(): BidV26 {
    if (this.videoFormats.length > 0) {
      return this.generateVideoBid();
    } else {
      return this.generateBannerBid();
    }
  }

  private generateBannerBid(): BidV26 {
    const bannerFormat = this.getBannerFormat();

    const bid: BidV26 = {
      id: this.helper.generateUUID(),
      impid: this.getImpId(),
      price: this.helper.generateRandomDecimal(0, 10),
      w: bannerFormat.w,
      h: bannerFormat.h,
      adm: this.generateDisplayMarkup(bannerFormat),
      mtype: 1,
    };

    if (bannerFormat.extension) {
      Object.assign(bid, bannerFormat.extension);
    }

    return bid;
  }

  private generateVideoBid(): BidV26 {
    const videoFormat = this.getVideoFormat();

    const bid: BidV26 = {
      id: this.helper.generateUUID(),
      impid: this.getImpId(),
      price: this.helper.generateRandomDecimal(0, 10),
      adm: this.generateVastMarkup(videoFormat),
      w: 640,
      h: 480,
      mtype: 2,
    };

    if (videoFormat.extension) {
      Object.assign(bid, videoFormat.extension);
    }

    return bid;
  }

  private getVideoFormat(): VideoFormat {
    return this.helper.selectRandomArrayItem<VideoFormat>(this.videoFormats);
  }

  private getBannerFormat(): BannerFormat {
    if (this.bannerFormats.length === 0) {
      return {
        w: 300,
        h: 250,
      };
    } else {
      return this.helper.selectRandomArrayItem<BannerFormat>(
        this.bannerFormats
      );
    }
  }

  private generateDisplayMarkup(format: BannerFormat): string {
    const displayCreative = new DisplayModule({
      definitions: this.definitions,
      helper: this.helper,
    });

    return displayCreative.size(format.w, format.h);
  }

  private generateVastMarkup(format: VideoFormat): string {
    const vastCreative = new VastModule({
      definitions: this.definitions,
      helper: this.helper,
    });

    return vastCreative.subType(format.subType);
  }

  private enrich(bidResponse: BidResponseV26): BidResponseV26 {
    if (this._id) {
      bidResponse.id = this._id;
    }

    if (this._bidid) {
      bidResponse.bidid = this._bidid;
    }

    if (this._cur) {
      bidResponse.cur = this._cur;
    }

    if (this._customdata) {
      bidResponse.customdata = this._customdata;
    }

    if (this._ext) {
      bidResponse.ext = this._ext;
    }

    return bidResponse;
  }
}
