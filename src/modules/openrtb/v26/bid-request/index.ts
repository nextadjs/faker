import type { BidRequestV26 } from "@/types/openrtb";
import { generateRandomArrayItem } from "@/utils/generator";
import { Module } from "@/module";
import type { SiteEntryDefinition } from "@/definitions";

export class BidRequestV26Module extends Module {
  private impressionCount: number = 1;
  private _context: string = "site";

  public imp(impressionCount: number): this {
    this.impressionCount = impressionCount;
    return this;
  }

  public context(context: "site"): this {
    this._context = context;
    return this;
  }

  public site(): this {
    this._context = 'site';
    return this;
  }

  public minimal(): BidRequestV26 {
    const bidRequest: BidRequestV26 = {
      id: this.helper.generateUUID(),
      imp: [...Array(this.impressionCount)].map((_, i) => ({
        id: (i + 1).toString(),
        banner: {
          w: 300,
          h: 250,
        },
      })),
    };

    if (this._context === "site") {
      const site = generateRandomArrayItem<SiteEntryDefinition>(
        this.definitions.adcom.context.site
      );

      bidRequest.site = {
        domain: site.domain,
        page: site.page,
      };
    }

    return bidRequest;
  }
}
