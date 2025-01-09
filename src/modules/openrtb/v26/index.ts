import type { ModuleConfig, OpenRTBV26Modules } from "@/types";
import { BidRequestV26Module } from "./bid-request";
import { BidResponseV26Module } from "./bid-response";

export class OpenRTBV26ModuleFactory {
  constructor(private readonly config: ModuleConfig) {}

  create(): OpenRTBV26Modules {
    return {
      bidRequest: new BidRequestV26Module(this.config),
      bidResponse: new BidResponseV26Module(this.config),
    };
  }
}
