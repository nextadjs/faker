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
});
