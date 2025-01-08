import type { DOOHVenueTaxonomy, DOOHVenueType } from "iab-adcom";

export type AdCOMDefinition = {
  context: {
    site: SiteEntryDefinition[];
    app: AppEntryDefinition[];
    dooh: DoohEntryDefinition[];
  };
};

export type SiteEntryDefinition = {
  domain: string;
  page: string;
};

export type AppEntryDefinition = {
  domain: string;
};

export type DoohEntryDefinition = {
  venuetype: string[];
  venuetypetax: DOOHVenueTaxonomy;
  domain: string;
};
