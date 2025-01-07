import { BidRequestV26Module } from "@/modules/openrtb/v26/bid-request";
import { data } from "@/data";
import { mock } from "vitest-mock-extended";
import type { IHelper } from "@/types/interface";

describe("OpenRTB version 2.6 Bid Request Module Behavior", () => {
  it("トップレベルの必須パラメーターが存在する", () => {
    const helper = mock<IHelper>({
      generateUUID: () => "1",
    });
    const sut = new BidRequestV26Module({
      definitions: data,
      helper: helper,
    });

    const result = sut.minimal();

    expect(result.id).toBe("1");
    expect(result).toHaveProperty("imp");
  });

  it("インプレッション配列が適切に生成されている", () => {
    const helper = mock<IHelper>();
    const sut = new BidRequestV26Module({
      definitions: data,
      helper: helper,
    });

    const result = sut.minimal();

    expect(result.imp.length).toEqual(1);
    expect(result.imp[0].id).toBe("1");
  });

  it("バナー広告枠が300x250で正しく指定されている", () => {
    const helper = mock<IHelper>();
    const sut = new BidRequestV26Module({
      definitions: data,
      helper: helper,
    });

    const result = sut.minimal();

    expect(result.imp[0]).toHaveProperty("banner");
    expect(result.imp[0].banner?.w).toEqual(300);
    expect(result.imp[0].banner?.h).toEqual(250);
  });

  it("指定した数だけインプレッションが生成される", () => {
    const helper = mock<IHelper>();
    const sut = new BidRequestV26Module({
      definitions: data,
      helper: helper,
    });

    const result = sut.imp(2).minimal();

    expect(result.imp.length).toEqual(2);
  });

  it("各インプレッションが一意の値を持つ", () => {
    const helper = mock<IHelper>();
    const sut = new BidRequestV26Module({
      definitions: data,
      helper: helper,
    });

    const result = sut.imp(2).minimal();

    expect(result.imp[0].id !== result.imp[1].id).toBe(true);
  });

  it("デフォルトでサイトコンテキストが指定される", () => {
    const helper = mock<IHelper>();
    const sut = new BidRequestV26Module({
      definitions: data,
      helper: helper,
    });

    const result = sut.minimal();

    expect(result).toHaveProperty("site");
  });

  it("サイトコンテキストを明示的に指定できる", () => {
    const helper = mock<IHelper>();
    const sut = new BidRequestV26Module({
      definitions: data,
      helper: helper,
    });

    const result = sut.context("site").minimal();

    expect(result).toHaveProperty("site");
  });

  it("サイト情報が設定される", () => {
    const helper = mock<IHelper>();
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
    const helper = mock<IHelper>();
    const sut = new BidRequestV26Module({
      definitions: data,
      helper: helper,
    });

    const result = sut.site().minimal();

    expect(result).toHaveProperty("site");
  });

  it("メソッドチェーンが正しく動作する", () => {
    const helper = mock<IHelper>();
    const sut = new BidRequestV26Module({
      definitions: data,
      helper: helper,
    });

    const result = sut.imp(2).site().minimal();

    expect(result.imp.length).toEqual(2);
    expect(result).toHaveProperty("site");
  });
});
