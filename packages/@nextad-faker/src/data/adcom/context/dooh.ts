export default [
  {
    id: "station_dooh_001",
    name: "Shinjuku Station Central Display",
    venue: 1 as const, // 駅
    fixed: 1,
    etime: 15,
    dpi: 300,
    content: {
      id: "cont_001",
      title: "Station Digital Billboard",
    },
    pub: {
      id: "pub_007",
      name: "Transit Media Corp",
      domain: "transitmedia.co.jp",
    },
  },
  {
    id: "taxi_dooh_001",
    name: "Tokyo Taxi Network",
    venue: 2 as const, // タクシー
    fixed: 2,
    etime: 30,
    dpi: 150,
    content: {
      id: "cont_002",
      title: "Taxi Display Network",
    },
    pub: {
      id: "pub_008",
      name: "Mobile Media Solutions",
      domain: "mobilemedia.co.jp",
    },
  },
  {
    id: "mall_dooh_001",
    name: "Shopping Mall Premium Display",
    venue: 3 as const, // ショッピングモール
    fixed: 1,
    etime: 20,
    dpi: 400,
    content: {
      id: "cont_003",
      title: "Mall Digital Signage",
    },
    pub: {
      id: "pub_009",
      name: "Retail Media Network",
      domain: "retailmedia.co.jp",
    },
  },
];
