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
    return this.helper.selectRandomArrayItem(
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

  public eid(): ExtendedIdentifier {
    return this.helper.selectRandomArrayItem(
      this.definitions.adcom.context.eid
    );
  }

  public euid(): ExtendedIdentifierUID {
    return this.helper.selectRandomArrayItem(
      this.definitions.adcom.context.euid
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

  public userAgent(): UserAgent {
    return this.helper.selectRandomArrayItem(
      this.definitions.adcom.context.userAgent
    );
  }

  public geo(): Geo {
    return this.helper.selectRandomArrayItem(
      this.definitions.adcom.context.geo
    );
  }

  public data(): Data {
    return this.helper.selectRandomArrayItem(
      this.definitions.adcom.context.data
    );
  }

  public publisher(): Publisher {
    return this.helper.selectRandomArrayItem(
      this.definitions.adcom.context.publisher
    );
  }

  public brandVersion(): BrandVersion {
    return this.helper.selectRandomArrayItem(
      this.definitions.adcom.context.brandVersion
    );
  }

  public regs(): Regs {
    return this.helper.selectRandomArrayItem(
      this.definitions.adcom.context.regs
    );
  }
}
