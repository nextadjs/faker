import { data } from "./data";
import type { Definition } from "./definitions";
import { Helper } from "./helper";
import { BidRequestV26Module } from "./modules/openrtb/v26/bid-request";

export class Faker {
  public readonly openrtb: {
    v26: BidRequestV26Module;
  };

  private definitions: Definition;
  private helper: Helper;

  public constructor() {
    this.definitions = data;
    this.helper = new Helper();
    this.openrtb = {
      v26: new BidRequestV26Module({
        definitions: this.definitions,
        helper: this.helper,
      }),
    };
  }
}