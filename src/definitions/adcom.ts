export type AdCOMDefinition = {
  context: {
    site: SiteEntryDefinition[];
    app: AppEntryDefinition[];
  };
};

export type SiteEntryDefinition = {
  domain: string;
  page: string;
};

export type AppEntryDefinition = {
  domain: string;
};
