import AdVerificationTest from "@/data/creative/vast/4.2/AdVerificationTest";
import {
  APIFramework,
  AudioVideoCreativeSubtype,
  CategoryTaxonomy,
  CreativeAttribute,
  ProductionQuality,
} from "iab-adcom";

export default [
  // Display ad (mtype: 1)
  {
    price: 3.5,
    adomain: ["brand-example.com"],
    iurl: "https://cdn.example.com/previews/display123.jpg",
    cid: "campaign_456",
    crid: "creative_789",
    w: 300,
    h: 250,
    mtype: 1,
    adm: '<div><img src="https://cdn.example.com/ads/banner300x250.jpg"></div>',
    cat: ["IAB3-1"],
    language: "ja",
    exp: 3600,
  },

  // Video ad (mtype: 2)
  {
    price: 12.75,
    adomain: ["video-advertiser.com"],
    bundle: "com.advertiser.app",
    cid: "vid_campaign_123",
    crid: "video_creative_456",
    mtype: 2,
    dur: 30,
    protocol: AudioVideoCreativeSubtype.VAST_4_2,
    apis: [APIFramework.VPAID_1_0, APIFramework.VPAID_2_0],
    cattax: CategoryTaxonomy.AD_PRODUCT_TAXONOMY_1_0,
    qagmediarating: ProductionQuality.PROFESSIONAL,
    adm: AdVerificationTest,
    exp: 7200,
  },

  // Audio ad (mtype: 3)
  {
    price: 8.9,
    adomain: ["audio-ads.example.com"],
    cid: "audio_campaign_345",
    crid: "audio_creative_678",
    mtype: 3,
    dur: 15,
    protocol: AudioVideoCreativeSubtype.VAST_4_2,
    adm: "<VAST><![CDATA[https://cdn.example.com/audio/ad.mp3]]></VAST>",
    cat: ["IAB9-1"],
    dealid: "special_audio_deal_123",
  },

  // Rich media display ad (mtype: 1 with extended features)
  {
    price: 6.8,
    adomain: ["interactive-ads.com"],
    iurl: "https://cdn.example.com/previews/rich123.jpg",
    cid: "rich_campaign_901",
    crid: "rich_creative_234",
    w: 970,
    h: 250,
    mtype: 1,
    apis: [APIFramework.MRAID_1_0],
    attr: [CreativeAttribute.IN_BANNER_VIDEO_AUTOPLAY, CreativeAttribute.IN_BANNER_VIDEO_USER_INITIATED],
    adm: '<div class="rich-media">...</div>',
    cat: ["IAB3-1", "IAB17-18"],
    langb: "ja-JP",
  },
];
