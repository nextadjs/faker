import { data } from "@/data";
import { Helper } from "@/helper";
import { BidRequestV26Module } from "@/modules/openrtb/v26/bid-request";
import { DeviceType, OperatingSystem } from "iab-adcom";

describe("OpenRTB v2.6 Bid Request Module Behavior", () => {
  let helper: Helper;

  beforeEach(() => {
    helper = new Helper();
  });

  it('Resets the instance when attempting to execute build methods', () => {
    const sut = new BidRequestV26Module({
      helper: helper,
      definitions: data,
    });
    sut.imp().make();

    const result = sut.imp().make();

    expect(result.imp.length).toEqual(1);
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

  describe("トップレベルパラメーター直接変更の振る舞い", () => {
    describe("withSite", () => {
      it("特定のサイト情報を指定する場合は入札のsiteに指定した情報が設定される", () => {
        const sut = new BidRequestV26Module({
          helper: helper,
          definitions: data,
        });

        const result = sut
          .withSite({
            domain: "example.com",
          })
          .make();

        expect(result.site?.domain).toBe("example.com");
      });

      it("特定のサイト情報を指定しない場合はランダムのsite情報が入札のsiteに設定される", () => {
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
                    domain: "site.com",
                  },
                ],
              },
            },
          },
        });

        const result = sut.withSite().make();

        expect(result.site?.domain).toBe("site.com");
      });
    });

    describe("withApp", () => {
      it("特定のアプリ情報を指定する場合は入札のappに指定した情報が設定される", () => {
        const sut = new BidRequestV26Module({
          helper,
          definitions: data,
        });

        const result = sut
          .withApp({
            domain: "example.app.com",
          })
          .make();

        expect(result.app?.domain).toBe("example.app.com");
      });

      it("特定のアプリ情報を指定しない場合はランダムのapp情報が入札のappに設定される", () => {
        const sut = new BidRequestV26Module({
          helper,
          definitions: {
            ...data,
            adcom: {
              ...data.adcom,
              context: {
                ...data.adcom.context,
                app: [
                  {
                    domain: "app.com",
                    bundle: "com.example.app",
                    storeurl: "https://store.example.com",
                    ver: "1.0.0",
                    cat: ["IAB1"],
                    kwarray: ["keyword1"],
                  },
                ],
              },
            },
          },
        });

        const result = sut.withApp().make();

        expect(result.app?.domain).toBe("app.com");
        expect(result.app?.bundle).toBe("com.example.app");
        expect(result.app?.storeurl).toBe("https://store.example.com");
        expect(result.app?.ver).toBe("1.0.0");
        expect(result.app?.cat).toEqual(["IAB1"]);
        expect(result.app?.kwarray).toEqual(["keyword1"]);
      });
    });

    describe("withDOOH", () => {
      it("特定のDOOH情報を指定する場合は入札のdoohに指定した情報が設定される", () => {
        const sut = new BidRequestV26Module({
          helper,
          definitions: data,
        });

        const result = sut
          .withDOOH({
            publisher: {
              domain: "publisher.com",
            },
          })
          .make();

        expect(result.dooh?.publisher?.domain).toBe("publisher.com");
      });

      it("特定のDOOH情報を指定しない場合はランダムのdooh情報が入札のdoohに設定される", () => {
        const sut = new BidRequestV26Module({
          helper,
          definitions: {
            ...data,
            adcom: {
              ...data.adcom,
              context: {
                ...data.adcom.context,
                dooh: [
                  {
                    pub: {
                      domain: "publisher.com",
                    },
                  },
                ],
              },
            },
          },
        });

        const result = sut.withDOOH().make();

        expect(result.dooh?.publisher?.domain).toBe("publisher.com");
      });
    });

    describe("withDevice", () => {
      it("特定のデバイス情報を指定する場合は入札のdeviceに指定した情報が設定される", () => {
        const sut = new BidRequestV26Module({
          helper,
          definitions: data,
        });

        const result = sut
          .withDevice({
            ip: "10.0.0.1",
            make: "Samsung",
          })
          .make();

        expect(result.device?.ip).toBe("10.0.0.1");
        expect(result.device?.make).toBe("Samsung");
      });

      it("特定のデバイス情報を指定しない場合はランダムのdevice情報が入札のdeviceに設定される", () => {
        const sut = new BidRequestV26Module({
          helper,
          definitions: {
            ...data,
            adcom: {
              ...data.adcom,
              context: {
                ...data.adcom.context,
                device: [
                  {
                    ip: "192.168.1.1",
                    ipv6: "2001:db8::1",
                    type: 1,
                    make: "Apple",
                    model: "iPhone",
                    os: OperatingSystem.IOS,
                    osv: "15.0",
                    hwv: "1.0",
                    w: 375,
                    h: 812,
                    ppi: 458,
                    pxratio: 2,
                    lang: "en",
                    langb: "en-US",
                    carrier: "carrier1",
                  },
                ],
              },
            },
          },
        });

        const result = sut.withDevice().make();

        expect(result.device?.ip).toBe("192.168.1.1");
        expect(result.device?.ipv6).toBe("2001:db8::1");
        expect(result.device?.devicetype).toBe(1);
        expect(result.device?.make).toBe("Apple");
        expect(result.device?.model).toBe("iPhone");
        expect(result.device?.os).toBe("iOS");
        expect(result.device?.osv).toBe("15.0");
        expect(result.device?.hwv).toBe("1.0");
        expect(result.device?.w).toBe(375);
        expect(result.device?.h).toBe(812);
        expect(result.device?.ppi).toBe(458);
        expect(result.device?.pxratio).toBe(2);
        expect(result.device?.language).toBe("en");
        expect(result.device?.langb).toBe("en-US");
        expect(result.device?.carrier).toBe("carrier1");
      });
    });

    describe("withUser", () => {
      it("特定のユーザー情報を指定する場合は入札のuserに指定した情報が設定される", () => {
        const sut = new BidRequestV26Module({
          helper,
          definitions: data,
        });

        const result = sut
          .withUser({
            id: "custom-user",
            buyeruid: "custom-buyer",
          })
          .make();

        expect(result.user?.id).toBe("custom-user");
        expect(result.user?.buyeruid).toBe("custom-buyer");
      });

      it("特定のユーザー情報を指定しない場合はランダムのuser情報が入札のuserに設定される", () => {
        const sut = new BidRequestV26Module({
          helper,
          definitions: {
            ...data,
            adcom: {
              ...data.adcom,
              context: {
                ...data.adcom.context,
                user: [
                  {
                    id: "user1",
                    buyeruid: "buyer1",
                    keywords: "keyword1,keyword2",
                    kwarray: ["keyword1", "keyword2"],
                    consent: "consent1",
                    eids: [
                      {
                        source: "source1",
                        uids: [
                          {
                            id: "id1",
                            atype: 1,
                            ext: { key: "value" },
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
            },
          },
        });

        const result = sut.withUser().make();

        expect(result.user?.id).toBe("user1");
        expect(result.user?.buyeruid).toBe("buyer1");
        expect(result.user?.keywords).toBe("keyword1,keyword2");
        expect(result.user?.kwarray).toEqual(["keyword1", "keyword2"]);
        expect(result.user?.consent).toBe("consent1");
        expect(result.user?.eids).toEqual([
          {
            source: "source1",
            uids: [
              {
                id: "id1",
                atype: 1,
                ext: { key: "value" },
              },
            ],
          },
        ]);
      });
    });

    describe("withRegulations", () => {
      it("特定の規制情報を指定する場合は入札のregsに指定した情報が設定される", () => {
        const sut = new BidRequestV26Module({
          helper,
          definitions: data,
        });

        const result = sut
          .withRegulations({
            coppa: 0,
            gdpr: 0,
          })
          .make();

        expect(result.regs?.coppa).toBe(0);
        expect(result.regs?.gdpr).toBe(0);
      });
    });

    describe("withGeo", () => {
      it("特定の位置情報を指定する場合は入札のgeoに指定した情報が設定される", () => {
        const sut = new BidRequestV26Module({
          helper,
          definitions: data,
        });

        const result = sut
          .withGeo({
            lat: 34.6937,
            lon: 135.5023,
            city: "Osaka",
          })
          .make();

        expect(result.device?.geo?.lat).toBe(34.6937);
        expect(result.device?.geo?.lon).toBe(135.5023);
        expect(result.device?.geo?.city).toBe("Osaka");
      });

      it("特定の位置情報を指定しない場合はランダムのgeo情報が入札のgeoに設定される", () => {
        const sut = new BidRequestV26Module({
          helper,
          definitions: {
            ...data,
            adcom: {
              ...data.adcom,
              context: {
                ...data.adcom.context,
                geo: [
                  {
                    lat: 35.6895,
                    lon: 139.6917,
                    type: 1,
                    accur: 1,
                    lastfix: 1,
                    ipserv: 1,
                    country: "JPN",
                    region: "Tokyo",
                    metro: "Tokyo",
                    city: "Tokyo",
                    zip: "100-0001",
                    utcoffset: 540,
                  },
                ],
              },
            },
          },
        });

        const result = sut.withGeo().make();

        expect(result.device?.geo?.lat).toBe(35.6895);
        expect(result.device?.geo?.lon).toBe(139.6917);
        expect(result.device?.geo?.type).toBe(1);
        expect(result.device?.geo?.accuracy).toBe(1);
        expect(result.device?.geo?.lastfix).toBe(1);
        expect(result.device?.geo?.ipservice).toBe(1);
        expect(result.device?.geo?.country).toBe("JPN");
        expect(result.device?.geo?.region).toBe("Tokyo");
        expect(result.device?.geo?.metro).toBe("Tokyo");
        expect(result.device?.geo?.city).toBe("Tokyo");
        expect(result.device?.geo?.zip).toBe("100-0001");
        expect(result.device?.geo?.utcoffset).toBe(540);
      });
    });
  });
});
