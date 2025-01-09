import { BidRequestV26Module } from "@/modules/openrtb/v26/bid-request";
import { data } from "@/data";
import { Helper } from "@/helper";

describe("OpenRTB version 2.6 Bid Request Module Behavior", () => {
  it("トップレベルの必須パラメーターが存在する", () => {
    const helper = new Helper();
    vi.spyOn(helper, "generateUUID").mockReturnValue("1");
    const sut = new BidRequestV26Module({
      definitions: data,
      helper: helper,
    });

    const result = sut.minimal();

    expect(result.id).toBe("1");
    expect(result).toHaveProperty("imp");
  });

  it("インプレッション配列が適切に生成されている", () => {
    const helper = new Helper();
    const sut = new BidRequestV26Module({
      definitions: data,
      helper: helper,
    });

    const result = sut.minimal();

    expect(result.imp.length).toEqual(1);
  });

  it("指定した数だけインプレッションが生成される", () => {
    const helper = new Helper();
    const sut = new BidRequestV26Module({
      definitions: data,
      helper: helper,
    });

    const result = sut.imp(2).minimal();

    expect(result.imp.length).toEqual(2);
  });

  it("各インプレッションが一意の値を持つ", () => {
    const helper = new Helper();
    const sut = new BidRequestV26Module({
      definitions: data,
      helper: helper,
    });

    const result = sut.imp(2).minimal();

    expect(result.imp[0].id !== result.imp[1].id).toBe(true);
  });

  it("インプレッションの情報を追加で指定できる", () => {
    const helper = new Helper();
    const sut = new BidRequestV26Module({
      definitions: data,
      helper: helper,
    });

    const result = sut
      .imp({
        bidfloor: 0.6,
      })
      .minimal();

    expect(result.imp[0].bidfloor).toBe(0.6);
  });

  it("デフォルトでサイトコンテキストが指定される", () => {
    const helper = new Helper();
    const sut = new BidRequestV26Module({
      definitions: data,
      helper: helper,
    });

    const result = sut.minimal();

    expect(result).toHaveProperty("site");
  });

  it("サイトコンテキストを明示的に指定する", () => {
    const helper = new Helper();
    const sut = new BidRequestV26Module({
      definitions: data,
      helper: helper,
    });

    const result = sut.context("site").minimal();

    expect(result).toHaveProperty("site");
  });

  it("サイト情報を指定する", () => {
    const helper = new Helper();
    const sut = new BidRequestV26Module({
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
      helper: helper,
    });

    const result = sut.context("site").minimal();

    expect(result.site?.domain).toBe("test.com");
    expect(result.site?.page).toBe("https://test.com/page");
  });

  it("サイトコンテキストを指定するショートカットメソッドが通常のコンテキスト指定と同じ動作をする", () => {
    const helper = new Helper();
    const sut = new BidRequestV26Module({
      definitions: data,
      helper: helper,
    });

    const result = sut.site().minimal();

    expect(result).toHaveProperty("site");
  });

  it("アプリ情報を指定する", () => {
    const helper = new Helper();
    const sut = new BidRequestV26Module({
      definitions: {
        ...data,
        adcom: {
          ...data.adcom,
          context: {
            ...data.adcom.context,
            app: [
              {
                domain: "app.test",
              },
            ],
          },
        },
      },
      helper: helper,
    });

    const result = sut.context("app").minimal();

    expect(result.app?.domain).toBe("app.test");
  });

  it("アプリコンテキストを指定するショートカットメソッドが通常のコンテキスト指定と同じ動作をする", () => {
    const helper = new Helper();
    const sut = new BidRequestV26Module({
      definitions: data,
      helper: helper,
    });

    const result = sut.app().minimal();

    expect(result).toHaveProperty("app");
  });

  it("DOOH情報を指定する", () => {
    const helper = new Helper();
    const sut = new BidRequestV26Module({
      definitions: {
        ...data,
        adcom: {
          ...data.adcom,
          context: {
            ...data.adcom.context,
            dooh: [
              {
                venuetypetax: 0,
                venuetype: ["transit"],
                domain: "example.com",
              },
            ],
          },
        },
      },
      helper: helper,
    });

    const result = sut.context("dooh").minimal();

    expect(result.dooh?.domain).toBe("example.com");
    expect(result.dooh?.venuetype).toEqual(["transit"]);
    expect(result.dooh?.venuetypetax).toBe(0);
  });

  it("DOOHコンテキストを指定するショートカットメソッドが通常のコンテキスト指定と同じ動作をする", () => {
    const helper = new Helper();
    const sut = new BidRequestV26Module({
      definitions: data,
      helper: helper,
    });

    const result = sut.dooh().minimal();

    expect(result).toHaveProperty("dooh");
  });

  it("サイトコンテキスト・アプリコンテキスト・DOOHコンテキストを同時に指定した場合、最後に指定したコンテキストが優先される", () => {
    const helper = new Helper();
    const sut = new BidRequestV26Module({
      definitions: data,
      helper: helper,
    });

    const result = sut.dooh().app().site().minimal();

    expect(result).not.toHaveProperty("app");
    expect(result).not.toHaveProperty("dooh");
    expect(result).toHaveProperty("site");
  });

  it("メソッドチェーンが正しく動作する", () => {
    const helper = new Helper();
    const sut = new BidRequestV26Module({
      definitions: data,
      helper: helper,
    });

    const result = sut.imp(2).site().minimal();

    expect(result.imp.length).toEqual(2);
    expect(result).toHaveProperty("site");
  });

  it("サイト情報を自由に指定する", () => {
    const helper = new Helper();
    const sut = new BidRequestV26Module({
      definitions: data,
      helper: helper,
    });

    const result = sut
      .site({
        publisher: {
          domain: "publisher.test.com",
        },
      })
      .minimal();

    expect(result.site?.publisher?.domain).toBe("publisher.test.com");
  });

  it("アプリ情報を自由に指定する", () => {
    const helper = new Helper();
    const sut = new BidRequestV26Module({
      definitions: data,
      helper: helper,
    });

    const result = sut
      .app({
        publisher: {
          domain: "publisher.test.com",
        },
      })
      .minimal();

    expect(result.app?.publisher?.domain).toBe("publisher.test.com");
  });

  it("DOOH情報を自由に指定する", () => {
    const helper = new Helper();
    const sut = new BidRequestV26Module({
      definitions: data,
      helper: helper,
    });

    const result = sut
      .dooh({
        publisher: {
          domain: "publisher.test.com",
        },
      })
      .minimal();

    expect(result.dooh?.publisher?.domain).toBe("publisher.test.com");
  });

  it("トップレベルのパラメーターを自由に指定する", () => {
    const helper = new Helper();
    const sut = new BidRequestV26Module({
      definitions: data,
      helper: helper,
    });

    const result = sut
      .custom({
        allimps: 1,
      })
      .minimal();

    expect(result.allimps).toBe(1);
  });

  it("拡張情報を自由に指定する", () => {
    const helper = new Helper();
    const sut = new BidRequestV26Module({
      definitions: data,
      helper: helper,
    });

    const result = sut
      .ext({
        nextadjs: "happy",
      })
      .minimal();

    expect(result.ext?.nextadjs).toBe("happy");
  });

  it("デバイス情報を自由に指定する", () => {
    const helper = new Helper();
    const sut = new BidRequestV26Module({
      definitions: data,
      helper: helper,
    });

    const result = sut
      .device({
        ip: "111.111.111.111",
      })
      .minimal();

    expect(result.device?.ip).toBe("111.111.111.111");
  });

  it("ユーザー情報を自由に指定する", () => {
    const helper = new Helper();
    const sut = new BidRequestV26Module({
      definitions: data,
      helper: helper,
    });

    const result = sut
      .user({
        id: "userId",
      })
      .minimal();

    expect(result.user?.id).toBe("userId");
  });

  it("オークションタイプを選択する", () => {
    const helper = new Helper();
    const sut = new BidRequestV26Module({
      definitions: data,
      helper: helper,
    });

    const result = sut.at(1).minimal();

    expect(result.at).toBe(1);
  });

  it("タイムアウトを指定する", () => {
    const helper = new Helper();
    const sut = new BidRequestV26Module({
      definitions: data,
      helper: helper,
    });

    const result = sut.tmax(1000).minimal();

    expect(result.tmax).toBe(1000);
  });

  it("ホワイトリストバイヤーシートを指定する", () => {
    const helper = new Helper();
    const sut = new BidRequestV26Module({
      definitions: data,
      helper: helper,
    });

    const result = sut.wseat(["nextadjs"]).minimal();

    expect(result.wseat).toEqual(["nextadjs"]);
  });

  it("ブロックリストバイヤーシートを指定する", () => {
    const helper = new Helper();
    const sut = new BidRequestV26Module({
      definitions: data,
      helper: helper,
    });

    const result = sut.bseat(["blocked-buyer"]).minimal();

    expect(result.bseat).toEqual(["blocked-buyer"]);
  });

  it("通貨を指定する", () => {
    const helper = new Helper();
    const sut = new BidRequestV26Module({
      definitions: data,
      helper: helper,
    });

    const result = sut.cur(["JPY", "USD"]).minimal();

    expect(result.cur).toEqual(["JPY", "USD"]);
  });

  it("ISO-639-1-alpha-2形式で許可された言語リストを指定する", () => {
    const helper = new Helper();
    const sut = new BidRequestV26Module({
      definitions: data,
      helper: helper,
    });

    const result = sut.wlang(["ja", "en"]).minimal();

    expect(result.wlang).toEqual(["ja", "en"]);
  });

  it("IETF BCP 47形式で許可された言語リストを指定する", () => {
    const helper = new Helper();
    const sut = new BidRequestV26Module({
      definitions: data,
      helper: helper,
    });

    const result = sut.wlangb(["ja-JP", "en-US"]).minimal();

    expect(result.wlangb).toEqual(["ja-JP", "en-US"]);
  });

  it("ブロックされたカテゴリーを指定する", () => {
    const helper = new Helper();
    const sut = new BidRequestV26Module({
      definitions: data,
      helper: helper,
    });

    const result = sut.bcat(["IAB3", "IAB4"]).minimal();

    expect(result.bcat).toEqual(["IAB3", "IAB4"]);
  });

  it("許可されたカテゴリーを指定する", () => {
    const helper = new Helper();
    const sut = new BidRequestV26Module({
      definitions: data,
      helper: helper,
    });

    const result = sut.acat(["IAB3", "IAB4"]).minimal();

    expect(result.acat).toEqual(["IAB3", "IAB4"]);
  });

  it("ブロックされたカテゴリーで使用される分類を指定する", () => {
    const helper = new Helper();
    const sut = new BidRequestV26Module({
      definitions: data,
      helper: helper,
    });

    const result = sut.cattax(1).minimal();

    expect(result.cattax).toBe(1);
  });

  it("ドメインブロックリストを指定する", () => {
    const helper = new Helper();
    const sut = new BidRequestV26Module({
      definitions: data,
      helper: helper,
    });

    const result = sut.badv(["blocked.com", "spam.com"]).minimal();

    expect(result.badv).toEqual(["blocked.com", "spam.com"]);
  });

  it("アプリケーションブロックリストを指定する", () => {
    const helper = new Helper();
    const sut = new BidRequestV26Module({
      definitions: data,
      helper: helper,
    });

    const result = sut.bapp(["com.blocked.app", "com.spam.app"]).minimal();

    expect(result.bapp).toEqual(["com.blocked.app", "com.spam.app"]);
  });

  it("ソース情報を指定する", () => {
    const helper = new Helper();
    const sut = new BidRequestV26Module({
      definitions: data,
      helper: helper,
    });
    const source = {
      tid: "test-transaction",
      pchain: "test-chain",
    };

    const result = sut.source(source).minimal();

    expect(result.source).toEqual(source);
  });

  it("Regs情報を指定する", () => {
    const helper = new Helper();
    const sut = new BidRequestV26Module({
      definitions: data,
      helper: helper,
    });
    const regs = {
      coppa: 1 as const,
    };

    const result = sut.regs(regs).minimal();

    expect(result.regs).toEqual(regs);
  });

  it("バナーフォーマットを指定すると300x250のバナー入札リクエストが生成される", () => {
    const helper = new Helper();
    const sut = new BidRequestV26Module({
      definitions: data,
      helper: helper,
    });

    const result = sut.banner().minimal();

    expect(result.imp[0]).toHaveProperty("banner");
    const format = result.imp[0].banner?.format![0];
    expect(format?.w).toBe(300);
    expect(format?.h).toBe(250);
  });

  it("バナーフォーマットを指定したうえでインプレッションを複数生成すると、全てのインプレッションに指定したバナーが含まれる", () => {
    const helper = new Helper();
    const sut = new BidRequestV26Module({
      definitions: data,
      helper: helper,
    });

    const result = sut.imp(2).banner().minimal();

    expect(result.imp[0]).toHaveProperty("banner");
    expect(result.imp[1]).toHaveProperty("banner");
  });

  it("バナーフォーマットにサイズを含めると指定のサイズのバナー入札リクエストが生成される", () => {
    const helper = new Helper();
    const sut = new BidRequestV26Module({
      definitions: data,
      helper: helper,
    });

    const result = sut.banner(300, 600).minimal();

    const format = result.imp[0].banner?.format![0];
    expect(format?.w).toBe(300);
    expect(format?.h).toBe(600);
  });

  it("フォーマットを指定しないとデフォルトで300x250のバナーフォーマットを含んだ入札リクエストが生成される", () => {
    const helper = new Helper();
    const sut = new BidRequestV26Module({
      definitions: data,
      helper: helper,
    });

    const result = sut.minimal();

    expect(result.imp[0]).toHaveProperty("banner");
    expect(result.imp[0]?.banner?.w).toBe(300);
    expect(result.imp[0]?.banner?.h).toBe(250);
  });

  it("バナーフォーマットの拡張パラーメーターを指定する", () => {
    const helper = new Helper();
    const sut = new BidRequestV26Module({
      definitions: data,
      helper: helper,
    });

    const result = sut
      .banner({
        pos: 1,
      })
      .minimal();

    expect(result.imp[0]?.banner?.pos).toBe(1);
  });

  it("バナーフォーマットのサイズと拡張パラメーターを指定する", () => {
    const helper = new Helper();
    const sut = new BidRequestV26Module({
      definitions: data,
      helper: helper,
    });

    const result = sut.banner(300, 600).minimal();

    expect(result.imp[0].banner?.format![0]?.w).toBe(300);
    expect(result.imp[0].banner?.format![0]?.h).toBe(600);
  });

  it("バナーフォーマットのサイズを複数指定したら一つのインプレッションオブジェクトに集約される", () => {
    const helper = new Helper();
    const sut = new BidRequestV26Module({
      definitions: data,
      helper: helper,
    });

    const result = sut.banner(300, 600).banner(300, 50).minimal();

    expect(result.imp[0].banner?.format![0]?.w).toBe(300);
    expect(result.imp[0].banner?.format![0]?.h).toBe(600);
    expect(result.imp[0].banner?.format![1]?.w).toBe(300);
    expect(result.imp[0].banner?.format![1]?.h).toBe(50);
  });

  it("拡張を含んだ状態でバナーフォーマットを複数していしたらインプレッションが二つに分割される", () => {
    const helper = new Helper();
    const sut = new BidRequestV26Module({
      definitions: data,
      helper: helper,
    });

    const result = sut
      .banner(300, 600, { pos: 2 })
      .banner({ pos: 3 })
      .minimal();

    expect(result.imp[0].banner?.w).toBe(300);
    expect(result.imp[0].banner?.h).toBe(600);
    expect(result.imp[0].banner?.pos).toBe(2);
    expect(result.imp[1].banner?.w).toBe(300);
    expect(result.imp[1].banner?.pos).toBe(3);
  });

  it("インプレッション数を指定した状態で拡張を含むバナーフォーマットを指定すると、全てのインプレッションにおいてランダムで設定される", () => {
    const helper = new Helper();
    vi.spyOn(helper, "selectRandomArrayItem").mockReturnValue({
      type: "banner",
      size: {
        w: 300,
        h: 600,
      },
      extension: {
        pos: 2,
      },
    });
    const sut = new BidRequestV26Module({
      definitions: data,
      helper: helper,
    });

    const result = sut
      .imp(1)
      .banner(300, 600, { pos: 2 })
      .banner({ pos: 3 })
      .minimal();

    expect(result.imp[0].banner?.w).toBe(300);
    expect(result.imp[0].banner?.h).toBe(600);
    expect(result.imp[0].banner?.pos).toBe(2);
  });

  it("拡張を含んだ状態と、サイズのみを含んだ状態でバナーフォーマットを指定したらサイズのみを含んだバナーフォーマットが一つのインプレッションに集約され、拡張を含んだバナーフォーマットが複数のインプレッションに分割される", () => {
    const helper = new Helper();
    const sut = new BidRequestV26Module({
      definitions: data,
      helper: helper,
    });

    const result = sut.banner(300, 600).banner(300, 50).banner({ pos: 2}).minimal();

    expect(result.imp[1].banner?.format![0]?.w).toBe(300);
    expect(result.imp[1].banner?.format![0]?.h).toBe(600);
    expect(result.imp[1].banner?.format![1]?.w).toBe(300);
    expect(result.imp[1].banner?.format![1]?.h).toBe(50);
    expect(result.imp[0].banner?.pos).toBe(2);
  });
});
