import { data } from "./data";
import { Helper } from "./helper";
import { CreativeModuleFactory } from "./modules/creative";
import { OpenRTBVModuleFactory } from "./modules/openrtb";
import type { CreativeModules, ModuleConfig, OpenRTBV26Modules } from "./types";

export class Faker {
  private readonly config: ModuleConfig;
  public readonly openrtb: {
    v26: OpenRTBV26Modules;
  };
  public readonly creative: CreativeModules;

  constructor() {
    this.config = {
      definitions: data,
      helper: new Helper(),
    };

    this.openrtb = new OpenRTBVModuleFactory(this.config).create();
    this.creative = new CreativeModuleFactory(this.config).create();
  }

  public reset(): void {
    const newInstance = new Faker();
    Object.assign(this, newInstance);
  }
}
