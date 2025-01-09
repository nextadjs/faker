import type { ModuleConfig, OpenRTBModules } from "@/types";
import { OpenRTBV26ModuleFactory } from "./v26";

export class OpenRTBModuleFactory {
  constructor(private readonly config: ModuleConfig) {}

  create(): OpenRTBModules {
    return {
      v26: new OpenRTBV26ModuleFactory(this.config).create(),
    };
  }
}
