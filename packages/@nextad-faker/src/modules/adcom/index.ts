import type { AdCOMModules, ModuleConfig } from "@/types";
import { ContextModule } from "./context";

export class AdCOMModuleFactory {
  constructor(private readonly config: ModuleConfig) {}

  create(): AdCOMModules {
    return {
      context: new ContextModule(this.config),
    };
  }
}
