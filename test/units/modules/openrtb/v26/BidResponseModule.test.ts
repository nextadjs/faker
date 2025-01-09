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
    vi.spyOn(helper, "generateUUID").mockReturnValue("1");
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

  it("各入札の入札IDが一意を持つ", () => {
    const helper = new Helper();
    const sut = new BidResponseV26Module({
      definitions: data,
      helper: helper,
    });

    const result = sut.bid(2).minimal();

    const bids = result.seatbid![0].bid;
    expect(bids[0].id !== bids[1].id).toBe(true);
  });

  it("指定したインプレッションIDを入札が持つ", () => {
    const helper = new Helper();
    const sut = new BidResponseV26Module({
      definitions: data,
      helper: helper,
    });

    const result = sut.impId("1").minimal();

    const bids = result.seatbid![0].bid;
    expect(bids[0].impid).toBe("1");
  });

  it("指定したインプレッションIDのどれかを入札が持つ", () => {
    const helper = new Helper();
    vi.spyOn(helper, "selectRandomArrayItem").mockReturnValue("2");
    const sut = new BidResponseV26Module({
      definitions: data,
      helper: helper,
    });

    const result = sut.impId(["1", "2"]).minimal();

    const bids = result.seatbid![0].bid;
    expect(bids[0].impid).toBe("2");
  });

  it("入札不参加レスポンスを生成する", () => {
    const helper = new Helper();
    vi.spyOn(helper, "generateUUID").mockReturnValue("1");
    const sut = new BidResponseV26Module({
      definitions: data,
      helper: helper,
    });

    const result = sut.nbr();

    expect(result.id).toBe("1");
    expect(result.nbr).toEqual(0);
  });

  it("NBR理由コードを指定する", () => {
    const helper = new Helper();
    vi.spyOn(helper, "generateUUID").mockReturnValue("1");
    const sut = new BidResponseV26Module({
      definitions: data,
      helper: helper,
    });

    const result = sut.nbr(2);

    expect(result.id).toBe("1");
    expect(result.nbr).toEqual(2);
  });

  it("バナーフォーマットを指定すると300x250のバナー入札レスポンスが生成される", () => {
    const helper = new Helper();
    const sut = new BidResponseV26Module({
      definitions: data,
      helper: helper,
    });

    const result = sut.banner().minimal();

    expect(result.seatbid![0]?.bid[0]?.w).toBe(300);
    expect(result.seatbid![0]?.bid[0]?.h).toBe(250);
  });

  it("バナーフォーマットを指定したうえで入札を複数生成すると、全ての入札に指定したバナーが含まれる", () => {
    const helper = new Helper();
    const sut = new BidResponseV26Module({
      definitions: data,
      helper: helper,
    });

    const result = sut.bid(2).banner().minimal();

    expect(result.seatbid![0].bid[0].w).toBe(300);
    expect(result.seatbid![0].bid[0].h).toBe(250);
    expect(result.seatbid![0].bid[1].w).toBe(300);
    expect(result.seatbid![0].bid[1].h).toBe(250);
  });

  it("バナーフォーマットにサイズを含めると指定のサイズのバナー入札レスポンスが生成される", () => {
    const helper = new Helper();
    const sut = new BidResponseV26Module({
      definitions: data,
      helper: helper,
    });

    const result = sut.banner(728, 90).minimal();

    expect(result.seatbid![0].bid[0].w).toBe(728);
    expect(result.seatbid![0].bid[0].h).toBe(90);
  });

  it("フォーマットを指定しないとデフォルトで300x250のバナーフォーマットを含んだ入札レスポンスが生成される", () => {
    const helper = new Helper();
    const sut = new BidResponseV26Module({
      definitions: data,
      helper: helper,
    });

    const result = sut.minimal();

    expect(result.seatbid![0].bid[0].w).toBe(300);
    expect(result.seatbid![0].bid[0].h).toBe(250);
  });

  it("バナーフォーマットの拡張パラメーターを指定する", () => {
    const helper = new Helper();
    const sut = new BidResponseV26Module({
      definitions: data,
      helper: helper,
    });

    const result = sut.banner({ iurl: "https://example.com/" }).minimal();

    expect(result.seatbid![0].bid[0]?.iurl).toBe("https://example.com/");
  });

  it("バナーフォーマットのサイズを複数指定した場合はランダムで選択される", () => {
    const helper = new Helper();
    vi.spyOn(helper, "selectRandomArrayItem").mockReturnValue({
      w: 728,
      h: 90,
    });
    const sut = new BidResponseV26Module({
      definitions: data,
      helper: helper,
    });

    const result = sut.banner(728, 90).banner(300, 250).minimal();

    expect(result.seatbid![0].bid[0].w).toBe(728);
    expect(result.seatbid![0].bid[0].h).toBe(90);
  });

  it("バナーフォーマットで指定したサイズに合わせてクリエイティブが生成される", () => {
    const helper = new Helper();
    const sut = new BidResponseV26Module({
      definitions: {
        ...data,
        creative: {
          ...data.creative,
          display: [
            {
              markup: '<div style="width:728px;height:90px">banner ad</div>',
              size: {
                w: 728,
                h: 90,
              },
            },
          ],
        },
      },
      helper: helper,
    });

    const result = sut.banner(728, 90).minimal();

    expect(result.seatbid![0].bid[0].adm).toBe(
      '<div style="width:728px;height:90px">banner ad</div>'
    );
  });

  it('IDを指定すると指定したIDを持つ入札レスポンスが生成される', () => {
    const helper = new Helper();
    const sut = new BidResponseV26Module({
      definitions: data,
      helper: helper,
    });

    const result = sut.id("1").minimal();

    expect(result.id).toBe("1");
  });

  it('入札IDを指定すると指定したIDを持つ入札レスポンスが生成される', () => {
    const helper = new Helper();
    const sut = new BidResponseV26Module({
      definitions: data,
      helper: helper,
    });

    const result = sut.bidid("1").minimal();

    expect(result.bidid).toBe("1");
  });

  it('通貨を指定すると指定した通貨を持つ入札レスポンスが生成される', () => {
    const helper = new Helper();
    const sut = new BidResponseV26Module({
      definitions: data,
      helper: helper,
    });

    const result = sut.cur("JPY").minimal();

    expect(result.cur).toBe("JPY");
  });

  it('カスタムデータを指定すると指定したカスタムデータを持つ入札レスポンスが生成される', () => {
    const helper = new Helper();
    const sut = new BidResponseV26Module({
      definitions: data,
      helper: helper,
    });

    const result = sut.customdata("custom").minimal();

    expect(result.customdata).toBe("custom");
  });

  it('拡張パラメーターを指定すると指定した拡張パラメーターを持つ入札レスポンスが生成される', () => {
    const helper = new Helper();
    const sut = new BidResponseV26Module({
      definitions: data,
      helper: helper,
    });

    const result = sut.ext({ key: "value" }).minimal();

    expect(result.ext).toEqual({ key: "value" });
  });
});
