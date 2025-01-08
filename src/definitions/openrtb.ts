import type { OpenRTBV26Definition } from "./openrtbv26";

export type OpenRTBDefinition = {
  v26: OpenRTBV26Definition;
  bidResponse: {
    seat: string[];
  };
};
