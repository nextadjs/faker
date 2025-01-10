import { data } from "@/data";
import type { Definition } from "@/definitions";
import { Helper } from "@/helper";
import { ContextModule } from "@/modules/adcom/context";
import { AgentType, DOOHVenueTaxonomy, OperatingSystem } from "iab-adcom";

describe("Content Module Behavior", () => {
  let helper: Helper;
  let sut: ContextModule;
  let mockData: Definition;

  beforeEach(() => {
    helper = new Helper();
    mockData = {
      ...data,
      adcom: {
        ...data.adcom,
        context: {
          site: [
            {
              id: "fake-site-id",
              name: "Fake Site",
              domain: "fake-site.com",
              cat: ["fake", "site"],
              pagecat: ["fake", "page"],
              page: "fake-page",
              ref: "https://fake-ref.com",
              search: "fake-search",
              keywords: "fake,site",
            },
          ],
          app: [
            {
              id: "fake-app-id",
              name: "Fake App",
              bundle: "com.fake.app",
              domain: "fake-app.com",
              storeurl: "https://store.fake-app.com",
              cat: ["fake", "app"],
              ver: "1.0.0",
            },
          ],
          dooh: [
            {
              venuetype: ["fake-venue-type"],
              venuetypetax: DOOHVenueTaxonomy.ADCOM,
              domain: "fake-dooh.com",
            },
          ],
          content: [
            {
              id: "fake-content-id",
              title: "Fake Content",
              series: "Fake Series",
              season: "1",
              episode: 1,
              cat: ["fake", "content"],
              prodq: 1,
              context: 1,
              rating: "PG",
            },
          ],
          user: [
            {
              id: "fake-user-id",
              buyeruid: "fake-buyer-id",
              yob: 1990,
              gender: "M",
              keywords: "fake,user",
              consent: "fake-consent",
            },
          ],
          eid: [
            {
              source: "fake-source",
              uids: [
                {
                  id: "fake-uid",
                  atype: AgentType.BROWSER_OR_DEVICE,
                },
              ],
            },
          ],
          euid: [
            {
              id: "fake-euid",
              atype: AgentType.BROWSER_OR_DEVICE,
            },
          ],
          device: [
            {
              ua: "fake-ua",
              ip: "127.0.0.1",
              ipv6: "::1",
              make: "Fake Make",
              model: "Fake Model",
              os: OperatingSystem.ANDROID,
              osv: "1.0",
              hwv: "1.0",
              h: 1920,
              w: 1080,
              ppi: 326,
              js: 1,
              carrier: "Fake Carrier",
              mccmnc: "123456",
            },
          ],
          geo: [
            {
              lat: 35.6895,
              lon: 139.6917,
              type: 1,
              country: "JPN",
              region: "13",
              metro: "Tokyo",
              city: "Shibuya",
              zip: "150-0002",
            },
          ],
          data: [
            {
              id: "fake-data-id",
              name: "Fake Data",
              segment: [
                {
                  id: "fake-segment-id",
                  name: "Fake Segment",
                  value: "fake-value",
                },
              ],
            },
          ],
          publisher: [
            {
              id: "fake-publisher-id",
              name: "Fake Publisher",
              domain: "fake-publisher.com",
              cat: ["fake", "publisher"],
            },
          ],
          brandVersion: [
            {
              brand: "Chrome",
              version: ["1.0"],
            },
          ],
          regs: [
            {
              coppa: 0,
              gdpr: 1,
            },
          ],
          userAgent: [
            {
              browsers: [
                {
                  brand: "Chrome",
                  version: ["1.0"],
                },
              ],
              platform: {
                brand: "Android",
                version: ["1.0"],
              },
            },
          ],
        },
      },
    };
  });

  it("アプリコンテキストを取得する", () => {
    sut = new ContextModule({ helper, definitions: mockData });
    const result = sut.app();
    expect(result).toEqual(mockData.adcom.context.app[0]);
  });

  it("DOOHコンテキストを取得する", () => {
    sut = new ContextModule({ helper, definitions: mockData });
    const result = sut.dooh();
    expect(result).toEqual(mockData.adcom.context.dooh[0]);
  });

  it("コンテンツコンテキストを取得する", () => {
    sut = new ContextModule({ helper, definitions: mockData });
    const result = sut.content();
    expect(result).toEqual(mockData.adcom.context.content[0]);
  });

  it("ユーザーコンテキストを取得する", () => {
    sut = new ContextModule({ helper, definitions: mockData });
    const result = sut.user();
    expect(result).toEqual(mockData.adcom.context.user[0]);
  });

  it("拡張識別子を取得する", () => {
    sut = new ContextModule({ helper, definitions: mockData });
    const result = sut.eid();
    expect(result).toEqual(mockData.adcom.context.eid[0]);
  });

  it("拡張識別子UIDを取得する", () => {
    sut = new ContextModule({ helper, definitions: mockData });
    const result = sut.euid();
    expect(result).toEqual(mockData.adcom.context.euid[0]);
  });

  it("デバイスコンテキストを取得する", () => {
    sut = new ContextModule({ helper, definitions: mockData });
    const result = sut.device();
    expect(result).toEqual(mockData.adcom.context.device[0]);
  });

  it("位置情報コンテキストを取得する", () => {
    sut = new ContextModule({ helper, definitions: mockData });
    const result = sut.geo();
    expect(result).toEqual(mockData.adcom.context.geo[0]);
  });

  it("データコンテキストを取得する", () => {
    sut = new ContextModule({ helper, definitions: mockData });
    const result = sut.data();
    expect(result).toEqual(mockData.adcom.context.data[0]);
  });

  it("パブリッシャーコンテキストを取得する", () => {
    sut = new ContextModule({ helper, definitions: mockData });
    const result = sut.publisher();
    expect(result).toEqual(mockData.adcom.context.publisher[0]);
  });

  it("ブランドバージョンを取得する", () => {
    sut = new ContextModule({ helper, definitions: mockData });
    const result = sut.brandVersion();
    expect(result).toEqual(mockData.adcom.context.brandVersion[0]);
  });

  it("規制コンテキストを取得する", () => {
    sut = new ContextModule({ helper, definitions: mockData });
    const result = sut.regs();
    expect(result).toEqual(mockData.adcom.context.regs[0]);
  });
});
