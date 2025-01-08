import type { Definition } from "@/definitions";
import site from "./adcom/context/site";
import seat from "./openrtb/bid-response/seat";

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
    },
  },
};
