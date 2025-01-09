import { Module } from "@/module";
import type { BidResponseV26, BidV26 } from "@/types/openrtb";
import { NoBidReasonCode } from "iab-openrtb/v26";

type BannerFormat = {
  w: number;
  h: number;
  extension?: Partial<BidV26>;
};

export class BidResponseV26Module extends Module {
  private seatBidCount: number = 1;
  private bidCount: number = 1;
  private _impId?: string | string[];
  private bannerFormats: BannerFormat[] = [];

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

  public nbr(
    noBidReasonCode: NoBidReasonCode = NoBidReasonCode.UNKNOWN_ERROR
  ): BidResponseV26 {
    return {
      id: this.helper.generateUUID(),
      nbr: noBidReasonCode,
    };
  }

  public minimal(): BidResponseV26 {
    return {
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
    };
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
    const bannerFormat = this.getBannerFormat();

    const bid: BidV26 = {
      id: this.helper.generateUUID(),
      impid: this.getImpId(),
      price: this.helper.generateRandomDecimal(0, 10),
      w: bannerFormat.w,
      h: bannerFormat.h,
      adm: this.generateAdMarkup(bannerFormat),
      mtype: 1,
    };

    if (bannerFormat.extension) {
      Object.assign(bid, bannerFormat.extension);
    }

    return bid;
  }

  private getBannerFormat(): BannerFormat {
    if (this.bannerFormats.length > 0) {
      return this.helper.selectRandomArrayItem<BannerFormat>(
        this.bannerFormats
      );
    }
    return { w: 300, h: 250 };
  }

  private generateAdMarkup(format: BannerFormat): string {
    return `<div style="width:${format.w}px;height:${format.h}px">banner ad</div>`;
  }
}
