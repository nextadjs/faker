import type { Definition } from "@/definitions";
import site from "./openrtb/bid-request/site";

export const data: Definition = {
  openrtb: {
    v26: {}
  },
  adcom: {
    context: {
      site: site,
    },
  },
};

