import type { CreativeModules, ModuleConfig } from "@/types";
import { DisplayModule } from "./display";
import { VastModule } from "./vast";

export class CreativeModuleFactory {
  constructor(private readonly config: ModuleConfig) {}

  create(): CreativeModules {
    return {
      display: new DisplayModule(this.config),
      vast: new VastModule(this.config),
    };
  }
}
