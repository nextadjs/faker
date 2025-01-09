import { data } from "@/data";
import { Helper } from "@/helper";
import { NativeModule } from "@/modules/creative/native";

describe("Native Module Behavior", () => {
  let helper: Helper;
  let sut: NativeModule;

  beforeEach(() => {
    helper = new Helper();
    sut = new NativeModule({
      helper: helper,
      definitions: data,
    });
  });

  it("タイトルを生成する", () => {
    vi.spyOn(helper, "selectRandomArrayItem").mockReturnValue({
      text: "title",
    });

    const result = sut.title();

    expect(result).toBe("title");
  });
});
