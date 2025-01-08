import type { BidRequestV26, SiteV26 } from "@/types/openrtb";
import { generateRandomArrayItem } from "@/utils/generator";
import { Module } from "@/module";
import type { SiteEntryDefinition } from "@/definitions";

type ContextType = "site" | "app";

interface ContextExtensions {
  site: SiteV26;
}

export class BidRequestV26Module extends Module {
  private impressionCount: number = 1;
  private _context: ContextType = "site";
  private _site: SiteV26 = {};

  public imp(impressionCount: number): this {
    this.impressionCount = impressionCount;
    return this;
  }

  public context<T extends keyof ContextExtensions>(
    context: T,
    extension?: ContextExtensions[T]
  ): this {
    this._context = context;

    if (extension) {
      if (context === "site") {
        this._site = extension;
      }
    }

    return this;
  }

  public site(site?: SiteV26): this {
    return this.context("site", site || {});
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
      bidRequest.site = this.generateSite();
    }

    return bidRequest;
  }

  private generateSite(): SiteV26 {
    const site = generateRandomArrayItem<SiteEntryDefinition>(
      this.definitions.adcom.context.site
    );

    return {
      domain: site.domain,
      page: site.page,
      ...this._site,
    };
  }
}
