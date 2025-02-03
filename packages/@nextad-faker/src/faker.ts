import { data } from "./data";
import { Helper } from "./helper";
import { AdCOMModuleFactory } from "./modules/adcom";
import { CreativeModuleFactory } from "./modules/creative";
import { OpenRTBModuleFactory } from "./modules/openrtb";
import type { AdCOMModules, CreativeModules, ModuleConfig, OpenRTBModules } from "./types";

export class Faker {
  private readonly config: ModuleConfig;
  public readonly openrtb: OpenRTBModules;
  public readonly creative: CreativeModules;
  public readonly adcom: AdCOMModules;

  constructor() {
    this.config = {
      definitions: data,
      helper: new Helper(),
    };

    this.openrtb = new OpenRTBModuleFactory(this.config).create();
    this.creative = new CreativeModuleFactory(this.config).create();
    this.adcom = new AdCOMModuleFactory(this.config).create();
  }

  public reset(): void {
    const newInstance = new Faker();
    Object.assign(this, newInstance);
  }
}
