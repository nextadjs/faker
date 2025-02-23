import { BidResponseBuilderV26 } from "@/libraries/builder";
import { Module } from "@/module";
import type { ModuleConfig } from "@/types";
import type {
  BidResponseV26,
  BidV26,
  NativeResponseV12,
} from "@/types/openrtb";
import { NoBidReasonCode } from "iab-openrtb/v26";

export class BidResponseV26Module extends Module {
  private builder: BidResponseBuilderV26;

  public constructor(config: ModuleConfig) {
    super(config);
    this.builder = new BidResponseBuilderV26();
  }

  public withId(id: string): this {
    this.builder.withId(id);
    return this;
  }

  public withBidId(bidid: string): this {
    this.builder.withBidId(bidid);
    return this;
  }

  public withCurrency(cur: string): this {
    this.builder.withCurrency(cur);
    return this;
  }

  public withCustomData(customdata: string): this {
    this.builder.withCustomData(customdata);
    return this;
  }

  public withNoBidReason(nbr: NoBidReasonCode): this {
    this.builder.withNoBidReason(nbr);
    return this;
  }

  public withExtension(ext: Record<string, unknown>): this {
    this.builder.withExtension(ext);
    return this;
  }

  public beginSeatBid(seat?: string): this {
    this.builder.beginSeatBid(seat);
    return this;
  }

  public withCommonBid(props: Partial<BidV26>): this {
    this.builder.withCommonBid(props);
    return this;
  }

  public withGroup(group: 0 | 1): this {
    this.builder.withGroup(group);
    return this;
  }

  public addBid(
    bidOrImpId: (Partial<BidV26> & { impid: string }) | string
  ): this {
    if (typeof bidOrImpId !== "string") {
      this.builder.addBid({
        price: this.helper.generateRandomDecimal(1, 10),
        ...bidOrImpId,
      });
    } else {
      const bid = this.helper.selectRandomArrayItem<Partial<BidV26>>(
        this.definitions.openrtb.v26.bid
      );

      this.builder.addBid({
        price: this.helper.generateRandomDecimal(1, 10),
        impid: bidOrImpId,
        ...bid,
      });
    }

    return this;
  }

  public addBannerBid(
    bidOrImpId: (Partial<BidV26> & { impid: string }) | string
  ): this {
    if (typeof bidOrImpId !== "string") {
      this.builder.addBid({
        price: this.helper.generateRandomDecimal(1, 10),
        mtype: 1,
        ...bidOrImpId,
      });
    } else {
      const bid = this.helper.selectRandomArrayItem<Partial<BidV26>>(
        this.definitions.openrtb.v26.bid.filter((bid) => bid.mtype === 1)
      );

      this.builder.addBid({
        price: this.helper.generateRandomDecimal(1, 10),
        impid: bidOrImpId,
        ...bid,
      });
    }

    return this;
  }

  public addVideoBid(
    bidOrImpId: (Partial<BidV26> & { impid: string }) | string
  ): this {
    if (typeof bidOrImpId !== "string") {
      this.builder.addBid({
        price: this.helper.generateRandomDecimal(1, 10),
        mtype: 2,
        ...bidOrImpId,
      });
    } else {
      const bid = this.helper.selectRandomArrayItem<Partial<BidV26>>(
        this.definitions.openrtb.v26.bid.filter((bid) => bid.mtype === 2)
      );

      this.builder.addBid({
        price: this.helper.generateRandomDecimal(1, 10),
        impid: bidOrImpId,
        ...bid,
      });   
    }

    return this;
  }

  public addAudioBid(
    bidOrImpId: (Partial<BidV26> & { impid: string }) | string
  ): this {
    if (typeof bidOrImpId !== "string") {
      this.builder.addBid({
        price: this.helper.generateRandomDecimal(1, 10),
        mtype: 3,
        ...bidOrImpId,
      });
    } else {
      const bid = this.helper.selectRandomArrayItem<Partial<BidV26>>(
        this.definitions.openrtb.v26.bid.filter((bid) => bid.mtype === 3)
      );

      this.builder.addBid({
        price: this.helper.generateRandomDecimal(1, 10),
        impid: bidOrImpId,
        ...bid,
      });
    }

    return this;
  }

  public addNativeBid(
    nativeResponse: NativeResponseV12,
    bid: Partial<BidV26> & { impid: string }
  ): this {
    this.builder.addBid({
      price: this.helper.generateRandomDecimal(1, 10),
      mtype: 4,
      adm: JSON.stringify(nativeResponse),
      ...bid,
    });

    return this;
  }

  public make(): BidResponseV26 {
    const bidResponse = this.builder.build();
    this.builder.reset();
    return bidResponse;
  }

  public nbr(
    noBidReasonCode: NoBidReasonCode = NoBidReasonCode.UNKNOWN_ERROR
  ): BidResponseV26 {
    const bidResponse = this.builder.withNoBidReason(noBidReasonCode).build();
    this.builder.reset();
    return bidResponse;
  }
}
