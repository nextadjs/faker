import { AudioVideoCreativeSubtype } from "iab-adcom";
import AdVerificationTest42 from "./vast/4.2/AdVerificationTest";
import ClosedCaptionTest from "./vast/4.2/ClosedCaptionTest";

export default [
  {
    vast: AdVerificationTest42,
    version: "4.2",
    subType: AudioVideoCreativeSubtype.VAST_4_2,
    size: {
      w: 640,
      h: 480,
    },
  },
  {
    vast: ClosedCaptionTest,
    version: "4.2",
    subType: AudioVideoCreativeSubtype.VAST_4_2,
    size: {
      w: 640,
      h: 360,
    },
  },
];
