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

  it("アイコンを生成する", () => {
    vi.spyOn(helper, "selectRandomArrayItem").mockReturnValue({
      url: "http://example.com/icon.png",
    });

    const result = sut.icon();

    expect(result.url).toBe("http://example.com/icon.png");
  });

  it("メイン画像を生成する", () => {
    vi.spyOn(helper, "selectRandomArrayItem").mockReturnValue({
      url: "http://example.com/main.png",
    });

    const result = sut.mainImage();

    expect(result.url).toBe("http://example.com/main.png");
  });

  it("ビデオを生成する", () => {
    vi.spyOn(helper, "selectRandomArrayItem").mockReturnValue({
      vasttag: "<VAST></VAST>",
    });

    const result = sut.video();

    expect(result.vasttag).toBe("<VAST></VAST>");
  });

  it("データを生成する", () => {
    vi.spyOn(helper, "selectRandomArrayItem").mockReturnValue({
      value: "data",
    });

    const result = sut.data();

    expect(result.value).toBe("data");
  });

  it("画像を生成する", () => {
    vi.spyOn(helper, "selectRandomArrayItem").mockReturnValue({
      url: "http://example.com/image.png",
    });

    const result = sut.image(3);

    expect(result.url).toBe("http://example.com/image.png");
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
