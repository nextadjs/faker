import { data } from "@/data";
import { Helper } from "@/helper";
import { BidResponseV26Module } from "@/modules/openrtb/v26/bid-response";

describe("OpenRTB v2.6 Bid Response Behavior", () => {
  let helper: Helper;

  beforeEach(() => {
    helper = new Helper();
  });

  it("Resets the instance when attempting to execute build methods", () => {
    const sut = new BidResponseV26Module({
      helper: helper,
      definitions: data,
    });
    sut.addBid("1").make();

    const result = sut.addBid("1").make();

    expect(result.seatbid![0].bid.length).toEqual(1);
  });

  describe("入札の振る舞い", () => {
    describe("addBid", () => {
      it("入札情報を指定しない場合、偽の入札情報が設定される", () => {
        const sut = new BidResponseV26Module({
          helper: helper,
          definitions: {
            ...data,
            openrtb: {
              ...data.openrtb,
              v26: {
                ...data.openrtb.v26,
                bid: [
                  {
                    adm: "<creative>",
                    mtype: 1,
                  },
                ],
              },
            },
          },
        });

        const result = sut.addBid("1").make();

        expect(result.seatbid![0].bid[0].adm).toBe("<creative>");
        expect(result.seatbid![0].bid[0].mtype).toBe(1);
      });

      it("入札情報を指定する場合、その入札情報が設定する場合", () => {
        const sut = new BidResponseV26Module({
          helper: helper,
          definitions: data,
        });

        const result = sut
          .addBid({
            impid: "1",
            adm: "<vast>",
            mtype: 3,
          })
          .make();

        expect(result.seatbid![0].bid[0].adm).toBe("<vast>");
        expect(result.seatbid![0].bid[0].mtype).toBe(3);
      });
    });

    describe("addBannerBid", () => {
      it("入札情報を指定しない場合、偽のバナー入札情報が設定される", () => {
        const sut = new BidResponseV26Module({
          helper: helper,
          definitions: {
            ...data,
            openrtb: {
              ...data.openrtb,
              v26: {
                ...data.openrtb.v26,
                bid: [
                  {
                    adm: "<vas>",
                    mtype: 3,
                  },
                  {
                    adm: "<creative>",
                    mtype: 1,
                  },
                ],
              },
            },
          },
        });

        const result = sut.addBannerBid("1").make();

        expect(result.seatbid![0].bid[0].adm).toBe("<creative>");
        expect(result.seatbid![0].bid[0].mtype).toBe(1);
      });

      it("入札情報を指定する場合、その入札情報が設定すると同時に、mtypeを1に指定する", () => {
        const sut = new BidResponseV26Module({
          helper: helper,
          definitions: data,
        });

        const result = sut
          .addBannerBid({
            impid: "1",
            adm: "<creative>",
          })
          .make();

        expect(result.seatbid![0].bid[0].adm).toBe("<creative>");
        expect(result.seatbid![0].bid[0].mtype).toBe(1);
      });
    });

    describe("addVideoBid", () => {
      it("入札情報を指定しない場合、偽の動画入札情報が設定される", () => {
        const sut = new BidResponseV26Module({
          helper: helper,
          definitions: {
            ...data,
            openrtb: {
              ...data.openrtb,
              v26: {
                ...data.openrtb.v26,
                bid: [
                  {
                    adm: "<vast>",
                    mtype: 2,
                  },
                  {
                    adm: "<creative>",
                    mtype: 1,
                  },
                ],
              },
            },
          },
        });

        const result = sut.addVideoBid("1").make();

        expect(result.seatbid![0].bid[0].adm).toBe("<vast>");
        expect(result.seatbid![0].bid[0].mtype).toBe(2);
      });

      it("入札情報を指定する場合、その入札情報が設定すると同時に、mtypeを2に指定する", () => {
        const sut = new BidResponseV26Module({
          helper: helper,
          definitions: data,
        });

        const result = sut
          .addVideoBid({
            impid: "1",
            adm: "<vast>",
          })
          .make();

        expect(result.seatbid![0].bid[0].adm).toBe("<vast>");
        expect(result.seatbid![0].bid[0].mtype).toBe(2);
      });
    });

    describe("addAudioBid", () => {
      it("入札情報を指定しない場合、偽のオーディオ入札情報が設定される", () => {
        const sut = new BidResponseV26Module({
          helper: helper,
          definitions: {
            ...data,
            openrtb: {
              ...data.openrtb,
              v26: {
                ...data.openrtb.v26,
                bid: [
                  {
                    adm: "<vast>",
                    mtype: 3,
                  },
                  {
                    adm: "<creative>",
                    mtype: 1,
                  },
                ],
              },
            },
          },
        });

        const result = sut.addAudioBid("1").make();

        expect(result.seatbid![0].bid[0].adm).toBe("<vast>");
        expect(result.seatbid![0].bid[0].mtype).toBe(3);
      });

      it("入札情報を指定する場合、その入札情報が設定すると同時に、mtypeを3に指定する", () => {
        const sut = new BidResponseV26Module({
          helper: helper,
          definitions: data,
        });

        const result = sut
          .addAudioBid({
            impid: "1",
            adm: "<vast>",
          })
          .make();

        expect(result.seatbid![0].bid[0].adm).toBe("<vast>");
        expect(result.seatbid![0].bid[0].mtype).toBe(3);
      });
    });

    describe("addNativeBid", () => {
      it("ネイティブレスポンスが文字列に変換されてadmに設定される", () => {
        const sut = new BidResponseV26Module({
          helper: helper,
          definitions: data,
        });

        const result = sut
          .addNativeBid(
            {
              assets: [],
              link: {
                url: "ex",
              },
            },
            {
              impid: "11",
            }
          )
          .make();

        expect(result.seatbid![0].bid[0].adm).toBe(
          `{"assets":[],"link":{"url":"ex"}}`
        );
        expect(result.seatbid![0].bid[0].mtype).toBe(4);
      });

      it("入札情報を追加で指定すると追加で指定した入札情報が含まれる", () => {
        const sut = new BidResponseV26Module({
          helper: helper,
          definitions: data,
        });

        const result = sut
          .addNativeBid(
            {
              assets: [],
              link: {
                url: "ex",
              },
            },
            {
              impid: "11",
              cat: ["IAB1-2"],
            }
          )
          .make();

        expect(result.seatbid![0].bid[0].cat).toEqual(["IAB1-2"]);
      });
    });
  });
});
