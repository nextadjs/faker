import { BidResponseV26Module } from "@/modules/openrtb/v26/bid-response";
import { data } from "@/data";
import { Helper } from "@/helper";

describe("OpenRTB version 2.6 Bid Response Module Behavior", () => {
  it("トップレベルの必須パラメーターが存在する", () => {
    const helper = new Helper();
    vi.spyOn(helper, "generateUUID").mockReturnValue("1");
    const sut = new BidResponseV26Module({
      definitions: data,
      helper: helper,
    });

    const result = sut.minimal();

    expect(result.id).toBe("1");
    expect(result).toHaveProperty("seatbid");
  });

  it("入札シートと入札配列が適切に生成される", () => {
    const helper = new Helper();
    vi.spyOn(helper, "generateRandomDecimal").mockReturnValue(2.22);
    vi.spyOn(helper, "selectRandomArrayItem").mockReturnValue("nextadjs");
    const sut = new BidResponseV26Module({
      definitions: data,
      helper: helper,
    });

    const result = sut.minimal();

    expect(result.seatbid).toBeDefined();
    expect(result.seatbid!.length).toBe(1);
    const seatBid = result.seatbid![0];
    expect(seatBid.seat).toBe("nextadjs");
    expect(seatBid.bid.length).toBe(1);
    expect(seatBid.bid[0].id).toBe("1");
    expect(seatBid.bid[0].impid).toBe("1");
    expect(seatBid.bid[0].price).toBe(2.22);
  });

  it("バナー広告が入札に含まれる", () => {
    const helper = new Helper();
    const sut = new BidResponseV26Module({
      definitions: data,
      helper: helper,
    });

    const result = sut.minimal();

    const seatBid = result.seatbid![0];
    expect(seatBid.bid[0].adm).toBe("<div>banner ad</div>");
    expect(seatBid.bid[0].mtype).toBe(1);
  });

  it("入札シート数を指定する", () => {
    const helper = new Helper();
    const sut = new BidResponseV26Module({
      definitions: data,
      helper: helper,
    });

    const result = sut.seatbid(2).minimal();

    expect(result.seatbid?.length).toBe(2);
  });

  it("入札数を指定する", () => {
    const helper = new Helper();
    const sut = new BidResponseV26Module({
      definitions: data,
      helper: helper,
    });

    const result = sut.bid(2).minimal();

    const bids = result.seatbid![0].bid;
    expect(bids.length).toBe(2);
  });

  it("入札シート数と入札シート数を指定すると入札シートごとに指定した数だけ入札が生成される", () => {
    const helper = new Helper();
    const sut = new BidResponseV26Module({
      definitions: data,
      helper: helper,
    });

    const result = sut.seatbid(2).bid(2).minimal();

    expect(result.seatbid?.length).toBe(2);
    const bids = result.seatbid![0].bid;
    const bids2 = result.seatbid![1].bid;
    expect(bids.length).toBe(2);
    expect(bids2.length).toBe(2);
  });
});
