import { Module } from "@/module";
import type { BidResponseV26 } from "@/types/openrtb";

export class BidResponseV26Module extends Module {
  private seatBidCount: number = 1;
  private bidCount: number = 1;
  private _impId?: string | string[];

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

  public minimal(): BidResponseV26 {
    return {
      id: this.helper.generateUUID(),
      seatbid: [...Array(this.seatBidCount)].map((_, __) => {
        return {
          bid: [...Array(this.bidCount)].map((_, bidIndex) => {
            return {
              id: (bidIndex + 1).toString(),
              impid: this.getImpId(),
              price: this.helper.generateRandomDecimal(0, 10),
              w: 300,
              h: 250,
              adm: "<div>banner ad</div>",
              mtype: 1,
            };
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
      return "1";
    } else if (typeof this._impId === "string") {
      return this._impId;
    } else {
      return this.helper.selectRandomArrayItem<string>(this._impId) || "1";
    }
  }
}
