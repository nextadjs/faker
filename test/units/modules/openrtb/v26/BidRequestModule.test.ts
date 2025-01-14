import { data } from "@/data";
import { Helper } from "@/helper";
import { BidRequestV26Module } from "@/modules/openrtb/v26/bid-request";
import { DeviceType } from "iab-adcom";

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

    it("withCommonImpメソッドですべてのimpオブジェクトに対して共通の値が設定される", () => {
      const sut = new BidRequestV26Module({
        helper: helper,
        definitions: data,
      });

      const result = sut
        .imp({
          bidfloor: 1,
        })
        .imp()
        .withCommonImp({
          bidfloorcur: "USD",
        })
        .make();

      expect(result.imp[0].bidfloor).toBe(1);
      expect(result.imp[0].bidfloorcur).toBe("USD");
      expect(result.imp[1].bidfloorcur).toBe("USD");
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
              ver: "1.2",
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

          const result = sut.native({ assets: [] }).imp().make();

          expect(result.imp.length).toBe(2);
          expect(result.imp[0]).toHaveProperty("native");
          expect(result.imp[1]).not.toHaveProperty("native");
        });
      });
    });
  });

  describe("デバイスの振る舞い", () => {
    it("モバイルメソッドを呼び出すとデバイスがモバイル向けの値に設定される", () => {
      const sut = new BidRequestV26Module({
        helper: helper,
        definitions: data,
      });

      const result = sut.mobile().make();

      expect(result.device?.devicetype).toBe(DeviceType.MOBILE_TABLET);
    });

    it("デスクトップメソッドを呼び出すデバイスがデバイス向けの値に設定される", () => {
      const sut = new BidRequestV26Module({
        helper: helper,
        definitions: data,
      });

      const result = sut.desktop().make();

      expect(result.device?.devicetype).toBe(DeviceType.PERSONAL_COMPUTER);
    });

    it("タブレットメソッドを呼び出すデバイスがデバイス向けの値に設定される", () => {
      const sut = new BidRequestV26Module({
        helper: helper,
        definitions: data,
      });

      const result = sut.tablet().make();

      expect(result.device?.devicetype).toBe(DeviceType.TABLET);
    });

    describe("ブラウザ", () => {
      it("chromeメソッドを呼び出すとuaにchrome向けの値が設定される", () => {
        const sut = new BidRequestV26Module({
          helper: helper,
          definitions: data,
        });

        const result = sut.chrome().make();

        expect(result.device?.ua).toBe(
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
        );
      });

      it("safariメソッドを呼び出すとuaにsafari向けの値が設定される", () => {
        const sut = new BidRequestV26Module({
          helper: helper,
          definitions: data,
        });

        const result = sut.safari().make();

        expect(result.device?.ua).toBe(
          "ozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.2 Safari/605.1.15"
        );
      });

      it("firefoxメソッドを呼び出すとuaにfirefox向けの値が設定される", () => {
        const sut = new BidRequestV26Module({
          helper: helper,
          definitions: data,
        });

        const result = sut.firefox().make();

        expect(result.device?.ua).toBe(
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:122.0) Gecko/20100101 Firefox/122.0"
        );
      });

      it("edgeメソッドを呼び出すとuaにedge向けの値が設定される", () => {
        const sut = new BidRequestV26Module({
          helper: helper,
          definitions: data,
        });

        const result = sut.edge().make();

        expect(result.device?.ua).toBe(
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36 Edg/120.0.0.0"
        );
      });
    });

    describe("OS", () => {
      it("androidメソッドを呼び出すとデバイスにandroidの値が設定される", () => {
        vi.spyOn(helper, "generateRandomDecimal").mockReturnValue(13.5);
        const sut = new BidRequestV26Module({
          helper: helper,
          definitions: data,
        });

        const result = sut.android().make();

        expect(result.device?.os).toBe("Android");
        expect(result.device?.osv).toBe("13.5");
      });

      it("iosメソッドを呼び出すとデバイスにiosの値が設定される", () => {
        vi.spyOn(helper, "generateRandomDecimal").mockReturnValue(14.5);
        const sut = new BidRequestV26Module({
          helper: helper,
          definitions: data,
        });

        const result = sut.ios().make();

        expect(result.device?.os).toBe("iOS");
        expect(result.device?.osv).toBe("14.5");
      });

      it("macosメソッドを呼び出すとデバイスにmacosの値が設定される", () => {
        vi.spyOn(helper, "generateRandomDecimal").mockReturnValue(13.5);
        const sut = new BidRequestV26Module({
          helper: helper,
          definitions: data,
        });

        const result = sut.macos().make();

        expect(result.device?.os).toBe("macOS");
        expect(result.device?.osv).toBe("13.5");
      });

      it("windowsメソッドを呼び出すとデバイスにwindowsの値が設定される", () => {
        vi.spyOn(helper, "selectRandomArrayItem").mockReturnValue("10.0");
        const sut = new BidRequestV26Module({
          helper: helper,
          definitions: data,
        });

        const result = sut.windows().make();

        expect(result.device?.os).toBe("Windows");
        expect(result.device?.osv).toBe("10.0");
      });
    });
  });

  describe("コンテキストの振る舞い", () => {
    it("webメソッドを呼び出すとwebの入札リクエストが設定される", () => {
      const sut = new BidRequestV26Module({
        helper: helper,
        definitions: {
          ...data,
          adcom: {
            ...data.adcom,
            context: {
              ...data.adcom.context,
              site: [
                {
                  domain: "test.com",
                  page: "https://test.com/page",
                },
              ],
            },
          },
        },
      });

      const result = sut.web().make();

      expect(result).toHaveProperty("site");
      expect(result.site?.domain).toBe("test.com");
      expect(result.site?.page).toBe("https://test.com/page");
    });

    it("appメソッドを呼び出すとappの入札リクエストが設定される", () => {
      const sut = new BidRequestV26Module({
        helper: helper,
        definitions: {
          ...data,
          adcom: {
            ...data.adcom,
            context: {
              ...data.adcom.context,
              app: [
                {
                  domain: "com.test",
                  cat: ["IAB1-1"],
                },
              ],
            },
          },
        },
      });

      const result = sut.app().make();

      expect(result).toHaveProperty("app");
      expect(result.app?.domain).toBe("com.test");
      expect(result.app?.cat).toEqual(["IAB1-1"]);
    });

    it("doohメソッドを呼び出すとdoohの入札リクエストが設定される", () => {
      const sut = new BidRequestV26Module({
        helper: helper,
        definitions: {
          ...data,
          adcom: {
            ...data.adcom,
            context: {
              ...data.adcom.context,
              dooh: [
                {
                  pub: {
                    domain: "test.com",
                  },
                },
              ],
            },
          },
        },
      });

      const result = sut.dooh().make();

      expect(result).toHaveProperty("dooh");
      expect(result.dooh?.publisher?.domain).toBe("test.com");
    });

    it("コンテキスト系のメソッドを複数呼び出すと複数コンテキスト系のリクエストになる", () => {
      const sut = new BidRequestV26Module({
        helper: helper,
        definitions: data,
      });

      const result = sut.dooh().web().app().make();

      expect(result).toHaveProperty("dooh");
      expect(result).toHaveProperty("site");
      expect(result).toHaveProperty("app");
    });
  });

  describe("入札関連の振る舞い", () => {
    it("firstPriceメソッドでオークションタイプがファーストプライス方式になる", () => {
      const sut = new BidRequestV26Module({
        helper: helper,
        definitions: data,
      });

      const result = sut.firstPrice().make();

      expect(result.at).toBe(1);
    });

    it("secondPriceメソッドオークションタイプがセカンドプライス方式になる", () => {
      const sut = new BidRequestV26Module({
        helper: helper,
        definitions: data,
      });

      const result = sut.secondePrice().make();

      expect(result.at).toBe(2);
    });
  });

  describe("地域の振る舞い", () => {
    it("usaメソッドでusaからのリクエストを示す値が含まれる", () => {
      const sut = new BidRequestV26Module({
        helper: helper,
        definitions: data,
      });

      const result = sut.usa().make();

      expect(result.device?.geo?.country).toBe("US");
      expect(result.device?.geo?.utcoffset).toBe(-5);
    });

    it("japanメソッドで日本からのリクエストを示す値が含まれる", () => {
      const sut = new BidRequestV26Module({
        helper: helper,
        definitions: data,
      });

      const result = sut.japan().make();

      expect(result.device?.geo?.country).toBe("JP");
      expect(result.device?.geo?.utcoffset).toBe(9);
    });

    it("ukメソッドでイギリスからのリクエストを示す値が含まれる", () => {
      const sut = new BidRequestV26Module({
        helper: helper,
        definitions: data,
      });

      const result = sut.uk().make();

      expect(result.device?.geo?.country).toBe("GB");
      expect(result.device?.geo?.utcoffset).toBe(0);
    });

    it("germanyメソッドでドイツからのリクエストを示す値が含まれる", () => {
      const sut = new BidRequestV26Module({
        helper: helper,
        definitions: data,
      });

      const result = sut.germany().make();

      expect(result.device?.geo?.country).toBe("DE");
      expect(result.device?.geo?.utcoffset).toBe(1);
    });

    it("franceメソッドでフランスからのリクエストを示す値が含まれる", () => {
      const sut = new BidRequestV26Module({
        helper: helper,
        definitions: data,
      });

      const result = sut.france().make();

      expect(result.device?.geo?.country).toBe("FR");
      expect(result.device?.geo?.utcoffset).toBe(1);
    });

    it("australiaメソッドでオーストラリアからのリクエストを示す値が含まれる", () => {
      const sut = new BidRequestV26Module({
        helper: helper,
        definitions: data,
      });

      const result = sut.australia().make();

      expect(result.device?.geo?.country).toBe("AU");
      expect(result.device?.geo?.utcoffset).toBe(10);
    });

    it("chinaメソッドで中国からのリクエストを示す値が含まれる", () => {
      const sut = new BidRequestV26Module({
        helper: helper,
        definitions: data,
      });

      const result = sut.china().make();

      expect(result.device?.geo?.country).toBe("CN");
      expect(result.device?.geo?.utcoffset).toBe(8);
    });

    it("canadaメソッドでカナダからのリクエストを示す値が含まれる", () => {
      const sut = new BidRequestV26Module({
        helper: helper,
        definitions: data,
      });

      const result = sut.canada().make();

      expect(result.device?.geo?.country).toBe("CA");
      expect(result.device?.geo?.utcoffset).toBe(-5);
    });

    it("indiaメソッドでインドからのリクエストを示す値が含まれる", () => {
      const sut = new BidRequestV26Module({
        helper: helper,
        definitions: data,
      });

      const result = sut.india().make();

      expect(result.device?.geo?.country).toBe("IN");
      expect(result.device?.geo?.utcoffset).toBe(5.5);
    });

    it("brazilメソッドでブラジルからのリクエストを示す値が含まれる", () => {
      const sut = new BidRequestV26Module({
        helper: helper,
        definitions: data,
      });

      const result = sut.brazil().make();

      expect(result.device?.geo?.country).toBe("BR");
      expect(result.device?.geo?.utcoffset).toBe(-3);
    });
  });

  describe("トップレベルパラメーター直接変更の振る舞い", () => {});
});
