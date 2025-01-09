import type { CreativeModules, ModuleConfig } from "@/types";
import { DisplayModule } from "./display";
import { VastModule } from "./vast";
import { NativeModule } from "./native";

export class CreativeModuleFactory {
  constructor(private readonly config: ModuleConfig) {}

  create(): CreativeModules {
    return {
      display: new DisplayModule(this.config),
      vast: new VastModule(this.config),
      native: new NativeModule(this.config),
    };
  }
}
