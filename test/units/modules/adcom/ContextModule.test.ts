import { data } from "@/data";
import type { Definition } from "@/definitions";
import { Helper } from "@/helper";
import { ContextModule } from "@/modules/adcom/context";
import {
  AgentType,
  DOOHVenueTaxonomy,
  DOOHVenueType,
  OperatingSystem,
} from "iab-adcom";

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
              venue: DOOHVenueType.AIRBORNE,
              pub: {
                domain: "example.com",
              },
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
          deviceFull: [
            {
              type: 1,
              ua: "Mozilla/5.0 (iPhone; CPU iPhone OS 16_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.5 Mobile/15E148 Safari/604.1",
              sua: {
                browsers: [
                  {
                    brand: "Safari",
                    version: ["16.5"],
                  },
                ],
                platform: {
                  brand: "iOS",
                  version: ["16.5"],
                },
              },
              ifa: "6E6ED276-B6E8-481E-A8F1-3E56F4B748A1",
              dnt: 0,
              lmt: 0,
              make: "Apple",
              model: "iPhone 14",
              os: 1,
              osv: "16.5",
              hwv: "iPhone14,7",
              h: 2532,
              w: 1170,
              ppi: 460,
              pxratio: 3.0,
              js: 1,
              lang: "ja",
              langb: "ja-JP",
              ip: "203.0.113.1",
              ipv6: "2001:db8:3333:4444:5555:6666:7777:8888",
              xff: "203.0.113.2, 203.0.113.1",
              iptr: 0,
              carrier: "SoftBank",
              mccmnc: "44020",
              mccmncsim: "44020",
              contype: 2,
              geofetch: 1,
              geo: {
                lat: 35.6812362,
                lon: 139.7671248,
                type: 1,
                lastfix: 1642000000,
                country: "JPN",
              },
              ext: {
                vendor_specific_data: "example_value",
              },
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

  it("全てのパラメーターが含まれるデバイス情報を取得する", () => {
    sut = new ContextModule({ helper, definitions: mockData });
    const result = sut.deviceFull();
    expect(result).toEqual(mockData.adcom.context.deviceFull[0]);
  });
});
