import { DeviceType } from "iab-adcom";

export default [
  {
    type: DeviceType.PHONE,
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
    geo: {},
    ext: {
      vendor_specific_data: "example_value",
    },
  },
];
