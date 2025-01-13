import { data } from "@/data";
import { Helper } from "@/helper";
import { BidRequestV26Module } from "@/modules/openrtb/v26/bid-request";

describe("OpenRTB v2.6 Bid Request Module Behavior", () => {
  let helper: Helper;

  beforeEach(() => {
    helper = new Helper();
  });

  describe("インプレッションの振る舞い", () => {
    it("impメソッドを一度呼び出すとimpオブジェクトが一つ含まれる", () => {
      const sut = new BidRequestV26Module({
        helper: helper,
        definitions: data,
      });

      const result = sut.imp().make();

      expect(result.imp.length).toEqual(1);
    });

    it("impメソッドを複数回呼び出すとimpオブジェクトが複数含まれる", () => {
      const sut = new BidRequestV26Module({
        helper: helper,
        definitions: data,
      });

      const result = sut.imp().imp().imp().make();

      expect(result.imp.length).toEqual(3);
    });

    describe("広告フォーマット", () => {
      describe("バナーフォーマット", () => {
        it("bannerメソッドを呼び出すとバナーフォーマットのimpオブジェクトが一つ含まれる", () => {
          const sut = new BidRequestV26Module({
            helper: helper,
            definitions: data,
          });

          const result = sut.banner().make();

          expect(result.imp[0]).toHaveProperty("banner");
        });

        it("bannerに何も値を指定しないと300x250のバナーがデフォルトでimpに含まれる", () => {
          const sut = new BidRequestV26Module({
            helper: helper,
            definitions: data,
          });

          const result = sut.banner().make();

          expect(result.imp[0].banner?.w).toBe(300);
          expect(result.imp[0].banner?.h).toBe(250);
        });

        it("bannerのサイズを単一で指定する場合はbanner.wとbanner.wに値が設定された状態でimpに含まれる", () => {
          const sut = new BidRequestV26Module({
            helper: helper,
            definitions: data,
          });

          const result = sut.banner(100, 200).make();

          expect(result.imp[0].banner?.w).toBe(100);
          expect(result.imp[0].banner?.h).toBe(200);
        });

        it("bannerのサイズを複数で指定する場合はformatに複数のサイズが設定された状態でimpに含まれる", () => {
          const sut = new BidRequestV26Module({
            helper: helper,
            definitions: data,
          });

          const result = sut
            .banner([
              [200, 300],
              [400, 600],
            ])
            .make();

          expect(result.imp[0].banner?.format![0].w).toBe(200);
          expect(result.imp[0].banner?.format![0].h).toBe(300);
          expect(result.imp[0].banner?.format![1].w).toBe(400);
          expect(result.imp[0].banner?.format![1].h).toBe(600);
        });

        it("bannerメソッドとimpメソッドを呼び出すと、バナーを含んだimpオブジェクトと、フォーマットを含まないimpオブジェクトが含まれる", () => {
          const sut = new BidRequestV26Module({
            helper: helper,
            definitions: data,
          });

          const result = sut
            .banner([
              [200, 300],
              [400, 600],
            ])
            .imp()
            .make();

          expect(result.imp.length).toBe(2);
          expect(result.imp[0]).toHaveProperty("banner");
          expect(result.imp[1]).not.toHaveProperty("banner");
        });

        it("bannerのサイズを単一で指定する場合に、第3引数にオプションを渡すと追加でオプションがimp.bannerに設定される", () => {
          const sut = new BidRequestV26Module({
            helper: helper,
            definitions: data,
          });

          const result = sut
            .banner(300, 600, {
              pos: 1,
            })
            .make();

          expect(result.imp[0].banner?.w).toBe(300);
          expect(result.imp[0].banner?.h).toBe(600);
          expect(result.imp[0].banner?.pos).toBe(1);
        });

        it("bannerのサイズを複数で指定する場合、第2引数にオプションを渡すと追加でオプションがimp.bannerに設定される", () => {
          const sut = new BidRequestV26Module({
            helper: helper,
            definitions: data,
          });

          const result = sut
            .banner(
              [
                [300, 600],
                [300, 250],
              ],
              {
                pos: 1,
              }
            )
            .make();

          expect(result.imp[0].banner?.format![0].w).toBe(300);
          expect(result.imp[0].banner?.format![0].h).toBe(600);
          expect(result.imp[0].banner?.format![1].w).toBe(300);
          expect(result.imp[0].banner?.format![1].h).toBe(250);
          expect(result.imp[0].banner?.pos).toBe(1);
        });
      });

      describe("ビデオフォーマット", () => {
        it("videoメソッドを呼び出すと動画フォーマットのimpオブジェクトが一つ含まれる", () => {
          const sut = new BidRequestV26Module({
            helper: helper,
            definitions: data,
          });

          const result = sut.video().make();

          expect(result.imp[0]).toHaveProperty("video");
        });

        it("videoにオプションを渡すと追加でオプションがimp.videoに含まれる", () => {
          const sut = new BidRequestV26Module({
            helper: helper,
            definitions: data,
          });

          const result = sut
            .video({
              mimes: ["video/mp4", "video/ogg"],
            })
            .make();

          expect(result.imp[0].video?.mimes).toEqual([
            "video/mp4",
            "video/ogg",
          ]);
        });

        it("videoメソッドとimpメソッドを呼び出すと、ビデオを含んだimpオブジェクトと、フォーマットを含まないimpオブジェクトが含まれる", () => {
          const sut = new BidRequestV26Module({
            helper: helper,
            definitions: data,
          });

          const result = sut.video().imp().make();

          expect(result.imp.length).toBe(2);
          expect(result.imp[0]).toHaveProperty("video");
          expect(result.imp[1]).not.toHaveProperty("video");
        });
      });

      describe("ネイティブフォーマと", () => {
        it("nativeメソッドを呼び出すとネイティブフォーマットのimpオブジェクトが一つ含まれる", () => {
          const sut = new BidRequestV26Module({
            helper: helper,
            definitions: data,
          });

          const result = sut
            .native({
              ver: '1.2',
              assets: [
                {
                  id: 1,
                },
              ],
            })
            .make();

          expect(result.imp[0]).toHaveProperty("native");
        });

        it("nativeメソッドとimpメソッドを呼び出すと、ネイティブを含んだimpオブジェクトと、フォーマットを含まないimpオブジェクトが含まれる", () => {
          const sut = new BidRequestV26Module({
            helper: helper,
            definitions: data,
          });

          const result = sut.native({assets: []}).imp().make();

          expect(result.imp.length).toBe(2);
          expect(result.imp[0]).toHaveProperty("native");
          expect(result.imp[1]).not.toHaveProperty("native");
        });
      });
    });

    describe("Begin系", () => {
      it("");
    });
  });

  describe("デバイス/環境の振る舞い", () => {});

  describe("入札関連の振る舞い", () => {});

  describe("地域の振る舞い", () => {});

  describe("トップレベルパラメーター直接変更の振る舞い", () => {});
});
