import type { BidRequestV26 } from "@/types/openrtb";
import { generateRandomArrayItem } from "@/utils/generator";
import { Module } from "@/module";
import type { SiteEntryDefinition } from "@/definitions";

export class BidRequestV26Module extends Module {
  public minimal(): BidRequestV26 {
    const site = generateRandomArrayItem<SiteEntryDefinition>(
      this.definitions.adcom.context.site
    );

    return {
      id: this.helper.generateUUID(),
      imp: [
        {
          id: "1",
          banner: {
            w: 300,
            h: 250,
          },
        },
      ],
      site: {
        domain: site.domain,
        page: site.page,
      },
    };
  }
}
