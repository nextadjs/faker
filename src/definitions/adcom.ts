import type { DOOHVenueTaxonomy } from "iab-adcom";
import type {
  App,
  BrandVersion,
  Content,
  Data,
  Device,
  Dooh,
  ExtendedIdentifier,
  ExtendedIdentifierUID,
  Geo,
  Publisher,
  Regs,
  Restrictions,
  Site,
  User,
  UserAgent,
} from "iab-adcom/context";

export type AdCOMDefinition = {
  context: {
    site: SiteEntryDefinition[];
    app: AppEntryDefinition[];
    dooh: DoohEntryDefinition[];
    content: ContentEntryDefinition[];
    user: UserEntryDefinition[];
    device: DeviceEntryDefinition[];
    geo: GeoEntryDefinition[];
    deviceFull: DeviceFullEntryDefinition[];
  };
};

export type SiteEntryDefinition = Site;
export type AppEntryDefinition = App;
export type DoohEntryDefinition = Dooh;
export type ContentEntryDefinition = Content;
export type UserEntryDefinition = User;
export type ExtendedIdentifierEntryDefinition = ExtendedIdentifier;
export type ExtendedIdentifierUIDEntryDefinition = ExtendedIdentifierUID;
export type DeviceEntryDefinition = Device;
export type DeviceFullEntryDefinition = Required<Device>;
export type UserAgentEntryDefinition = UserAgent;
export type GeoEntryDefinition = Geo;
export type DataEntryDefinition = Data;
export type PublisherEntryDefinition = Publisher;
export type BrandVerEntryDefinition = BrandVersion;
export type RegsEntryDefinition = Regs;
export type RestrictionsEntryDefinition = Restrictions;
