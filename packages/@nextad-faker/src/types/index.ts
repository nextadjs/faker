import type { Definition } from "@/definitions";
import type { Helper } from "@/helper";
import type { ContextModule } from "@/modules/adcom/context";
import type { DisplayModule } from "@/modules/creative/display";
import type { NativeModule } from "@/modules/creative/native";
import type { VastModule } from "@/modules/creative/vast";
import type { BidRequestV26Module } from "@/modules/openrtb/v26/bid-request";
import type { BidResponseV26Module } from "@/modules/openrtb/v26/bid-response";
import { OperatingSystem } from "iab-adcom";

export interface ModuleConfig {
  definitions: Definition;
  helper: Helper;
}

export interface OpenRTBModules {
  v26: OpenRTBV26Modules;
}

export interface CreativeModules {
  display: DisplayModule;
  vast: VastModule;
  native: NativeModule;
}

export interface AdCOMModules {
  context: ContextModule;
}

export interface OpenRTBV26Modules {
  bidRequest: BidRequestV26Module;
  bidResponse: BidResponseV26Module;
}


