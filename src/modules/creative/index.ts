import type { CreativeModules, ModuleConfig } from "@/types";
import { DisplayModule } from "./display";

export class CreativeModuleFactory {
  constructor(private readonly config: ModuleConfig) {}

  create(): CreativeModules {
    return {
      display: new DisplayModule(this.config),
    };
  }
}
