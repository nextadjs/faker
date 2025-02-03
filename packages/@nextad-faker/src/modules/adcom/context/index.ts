import type { SiteEntryDefinition } from "@/definitions";
import { Module } from "@/module";
import type {
  App,
  Dooh,
  Site,
  Content,
  User,
  ExtendedIdentifier,
  ExtendedIdentifierUID,
  Device,
  UserAgent,
  Geo,
  Data,
  Publisher,
  BrandVersion,
  Regs,
} from "iab-adcom/context";

export class ContextModule extends Module {
  public site(): Site {
    return this.helper.selectRandomArrayItem<SiteEntryDefinition>(
      this.definitions.adcom.context.site
    );
  }

  public app(): App {
    return this.helper.selectRandomArrayItem(
      this.definitions.adcom.context.app
    );
  }

  public dooh(): Dooh {
    return this.helper.selectRandomArrayItem(
      this.definitions.adcom.context.dooh
    );
  }

  public content(): Content {
    return this.helper.selectRandomArrayItem(
      this.definitions.adcom.context.content
    );
  }

  public user(): User {
    return this.helper.selectRandomArrayItem(
      this.definitions.adcom.context.user
    );
  }

  public device(): Device {
    return this.helper.selectRandomArrayItem(
      this.definitions.adcom.context.device
    );
  }

  public deviceFull(): Required<Device> {
    return this.helper.selectRandomArrayItem<Required<Device>>(
      this.definitions.adcom.context.deviceFull
    );
  }

  public geo(): Geo {
    return this.helper.selectRandomArrayItem(
      this.definitions.adcom.context.geo
    );
  }
}
