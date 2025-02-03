import { data } from "@/data";
import { Helper } from "@/helper";
import { VastModule } from "@/modules/creative/vast";

describe("Vast Module Behavior", () => {
  it("バージョン4.2のVASTを生成する", () => {
    const helper = new Helper();
    const sut = new VastModule({
      helper: helper,
      definitions: data,
    });
    vi.spyOn(helper, "selectRandomArrayItem").mockReturnValue({
      vast: '<VAST version="4.2"></VAST>',
    });

    const result = sut.v42();

    expect(result).toBe('<VAST version="4.2"></VAST>');
  });
});
