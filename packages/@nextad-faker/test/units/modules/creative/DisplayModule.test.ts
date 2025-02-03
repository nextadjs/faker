import { data } from "@/data";
import { Helper } from "@/helper";
import { DisplayModule } from "@/modules/creative/display";

describe("Display Module Behavior", () => {
  let helper: Helper;
  let sut: DisplayModule;

  beforeEach(() => {
    helper = new Helper();
    sut = new DisplayModule({
      helper: helper,
      definitions: data,
    });
  });

  it("300x250のディスプレイクリエイティブを生成する", () => {
    vi.spyOn(helper, 'selectRandomArrayItem').mockReturnValue({
      markup: '<div>display ad 300x250</div>'
    });

    const result = sut.s300x250();

    expect(result).toBe('<div>display ad 300x250</div>');
  });

  it("336x280のディスプレイクリエイティブを生成する", () => {
    vi.spyOn(helper, 'selectRandomArrayItem').mockReturnValue({
      markup: '<div>display ad 336x280</div>'
    });

    const result = sut.s336x280();

    expect(result).toBe('<div>display ad 336x280</div>');
  });

  it("728x90のディスプレイクリエイティブを生成する", () => {
    vi.spyOn(helper, 'selectRandomArrayItem').mockReturnValue({
      markup: '<div>display ad 728x90</div>'
    });

    const result = sut.s728x90();

    expect(result).toBe('<div>display ad 728x90</div>');
  });

  it("160x600のディスプレイクリエイティブを生成する", () => {
    vi.spyOn(helper, 'selectRandomArrayItem').mockReturnValue({
      markup: '<div>display ad 160x600</div>'
    });

    const result = sut.s160x600();

    expect(result).toBe('<div>display ad 160x600</div>');
  });

  it("300x600のディスプレイクリエイティブを生成する", () => {
    vi.spyOn(helper, 'selectRandomArrayItem').mockReturnValue({
      markup: '<div>display ad 300x600</div>'
    });

    const result = sut.s300x600();

    expect(result).toBe('<div>display ad 300x600</div>');
  });

  it("320x50のディスプレイクリエイティブを生成する", () => {
    vi.spyOn(helper, 'selectRandomArrayItem').mockReturnValue({
      markup: '<div>display ad 320x50</div>'
    });

    const result = sut.s320x50();

    expect(result).toBe('<div>display ad 320x50</div>');
  });

  it("320x100のディスプレイクリエイティブを生成する", () => {
    vi.spyOn(helper, 'selectRandomArrayItem').mockReturnValue({
      markup: '<div>display ad 320x100</div>'
    });

    const result = sut.s320x100();

    expect(result).toBe('<div>display ad 320x100</div>');
  });
});