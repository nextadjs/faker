import { ContentContext, MediaRating, ProductionQuality } from "iab-adcom";

export default [
  {
    // Drama series content
    id: "content_drama_001",
    title: "Crossroads",
    series: "Crossroads",
    season: "Season 2",
    episode: 5,
    genre: "drama",
    url: "https://streaming-service.com/crossroads/s2/ep5",
    cat: ["IAB1", "IAB1-5"],
    cattax: 2,
    prodq: ProductionQuality.PROFESSIONAL,
    context: ContentContext.VIDEO,
    rating: "TV-14",
    mrating: MediaRating.OVER_12,
    kwarray: ["drama", "suspense", "romance"],
    live: 0,
    len: 3600,
    lang: "en",
    langb: "en-US",
    producer: {
      id: "prod_001",
      name: "Creative Vision Studios",
      domain: "cvstudios.com",
      cat: ["IAB1"],
    },
    network: {
      id: "net_001",
      name: "Global Streaming",
      domain: "globalstreaming.com",
    },
    channel: {
      id: "ch_001",
      name: "Premium Drama",
      domain: "globalstreaming.com/premium",
    },
  },
  {
    // Music content
    id: "content_music_001",
    title: "Midnight Dreams",
    artist: "Luna Swift",
    genre: "pop",
    album: "Starlight",
    isrc: "USRC17801231",
    cat: ["IAB25", "IAB25-3"],
    cattax: 2,
    prodq: ProductionQuality.PROFESSIONAL,
    context: ContentContext.MUSIC,
    urating: "4.8",
    kwarray: ["pop", "electronic", "indie"],
    live: 0,
    len: 210,
    lang: "en",
    producer: {
      id: "prod_002",
      name: "Starlight Records",
      domain: "starlight-records.com",
    },
    data: [
      {
        id: "genre_data",
        name: "Music Genre",
        segment: [
          {
            id: "pop_1",
            name: "Pop Music",
            value: "mainstream",
          },
        ],
      },
    ],
  },
  {
    // Game content
    id: "content_game_001",
    title: "Dragon Warriors Online",
    genre: "MMORPG",
    cat: ["IAB9-30"],
    cattax: 2,
    prodq: ProductionQuality.PROFESSIONAL,
    context: ContentContext.GAME,
    rating: "ESRB T",
    mrating: MediaRating.OVER_12,
    kwarray: ["RPG", "fantasy", "online"],
    live: 1,
    srcrel: 1,
    lang: "en",
    producer: {
      id: "prod_003",
      name: "Digital Quest Games",
      domain: "dqgames.com",
    },
  },
];
