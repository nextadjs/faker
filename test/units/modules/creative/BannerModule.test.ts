import { data } from "@/data";
import { Helper } from "@/helper";
import { BannerModule } from "@/modules/creative/banner";

describe("Banner Module Behavior", () => {
  it("300x250のバナークリエイティブを生成する", () => {
    const helper = new Helper();
    vi.spyOn(helper, 'selectRandomArrayItem').mockReturnValue({
        markup: '<div>banner ad 300x250</div>'
    });
    const sut = new BannerModule({
      helper: helper,
      definitions: data,
    });

    const result = sut.s300x250();

    expect(result).toBe('<div>banner ad 300x250</div>');
  });
});
