export type CreativeDefinition = {
  display: DisplayDefinition[];
};

export type DisplayDefinition = {
  markup: string;
  size: {
    w: number;
    h: number;
  };
};
