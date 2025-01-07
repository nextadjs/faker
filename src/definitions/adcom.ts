export type AdCOMDefinition = {
  context: {
    site: SiteEntryDefinition[];
  };
};

export type SiteEntryDefinition = {
  domain: string;
  page: string;
};
