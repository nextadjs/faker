import type { BidV26 } from "@/types/openrtb";

export type OpenRTBV26Definition = {
  bid: BidV26EntryDefinition[];
};

export type BidV26EntryDefinition = Partial<BidV26>;
