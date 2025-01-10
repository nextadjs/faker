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

    expect(result.text).toBe("title");
  });

  it("リンクを生成する", () => {
    vi.spyOn(helper, "selectRandomArrayItem").mockReturnValue({
      url: "http://example.com",
    });

    const result = sut.link();

    expect(result).toEqual({
      url: "http://example.com",
    });
  });

  it("リクエストに対してレスポンスを生成する", () => {
    sut = new NativeModule({
      helper: helper,
      definitions: {
        ...data,
        creative: {
          ...data.creative,
          native: {
            ...data.creative.native,
            title: [
              {
                text: "title",
              },
            ],
            link: [
              {
                url: "http://example.com",
              },
            ],
          },
        },
      },
    });

    vi.spyOn(helper, "selectRandomArrayItem")
      .mockReturnValueOnce({
        url: "http://example.com",
      })
      .mockReturnValue({
        text: "title",
      });

    const result = sut.req([
      {
        id: 1,
        required: 1,
        title: {
          len: 90,
        },
      },
    ]);

    expect(result).toEqual({
      ver: "1.2",
      link: {
        url: "http://example.com",
      },
      assets: [
        {
          id: 1,
          required: 1,
          title: {
            text: "title",
          },
        },
      ],
    });
  });
});
