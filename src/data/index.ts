import type { Definition } from "@/definitions";
import site from "./adcom/context/site";
import seat from "./openrtb/bid-response/seat";
import display from "./creative/display";
import app from "./adcom/context/app";
import dooh from "./adcom/context/dooh";

export const data: Definition = {
  openrtb: {
    v26: {},
    bidResponse: {
      seat: seat,
    },
  },
  adcom: {
    context: {
      site: site,
      app: app,
      dooh: dooh,
    },
  },
  creative: {
    display: display,
  },
};
