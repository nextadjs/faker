import { data } from "@/data";
import { Helper } from "@/helper";
import { BannerModule } from "@/modules/creative/banner";

describe("Banner Module Behavior", () => {
  let helper: Helper;
  let sut: BannerModule;

  beforeEach(() => {
    helper = new Helper();
    sut = new BannerModule({
      helper: helper,
      definitions: data,
    });
  });

  it("300x250のバナークリエイティブを生成する", () => {
    vi.spyOn(helper, 'selectRandomArrayItem').mockReturnValue({
      markup: '<div>banner ad 300x250</div>'
    });

    const result = sut.s300x250();

    expect(result).toBe('<div>banner ad 300x250</div>');
  });

  it("336x280のバナークリエイティブを生成する", () => {
    vi.spyOn(helper, 'selectRandomArrayItem').mockReturnValue({
      markup: '<div>banner ad 336x280</div>'
    });

    const result = sut.s336x280();

    expect(result).toBe('<div>banner ad 336x280</div>');
  });

  it("728x90のバナークリエイティブを生成する", () => {
    vi.spyOn(helper, 'selectRandomArrayItem').mockReturnValue({
      markup: '<div>banner ad 728x90</div>'
    });

    const result = sut.s728x90();

    expect(result).toBe('<div>banner ad 728x90</div>');
  });

  it("160x600のバナークリエイティブを生成する", () => {
    vi.spyOn(helper, 'selectRandomArrayItem').mockReturnValue({
      markup: '<div>banner ad 160x600</div>'
    });

    const result = sut.s160x600();

    expect(result).toBe('<div>banner ad 160x600</div>');
  });

  it("300x600のバナークリエイティブを生成する", () => {
    vi.spyOn(helper, 'selectRandomArrayItem').mockReturnValue({
      markup: '<div>banner ad 300x600</div>'
    });

    const result = sut.s300x600();

    expect(result).toBe('<div>banner ad 300x600</div>');
  });

  it("320x50のバナークリエイティブを生成する", () => {
    vi.spyOn(helper, 'selectRandomArrayItem').mockReturnValue({
      markup: '<div>banner ad 320x50</div>'
    });

    const result = sut.s320x50();

    expect(result).toBe('<div>banner ad 320x50</div>');
  });

  it("320x100のバナークリエイティブを生成する", () => {
    vi.spyOn(helper, 'selectRandomArrayItem').mockReturnValue({
      markup: '<div>banner ad 320x100</div>'
    });

    const result = sut.s320x100();

    expect(result).toBe('<div>banner ad 320x100</div>');
  });
});