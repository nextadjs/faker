import type { DisplayDefinition } from "@/definitions";
import { Module } from "@/module";

export class DisplayModule extends Module {
  public size(width: number, height: number): string {
    return this.getByDimensions(width, height);
  }

  private getByDimensions(width: number, height: number): string {
    return this.helper.selectRandomArrayItem<DisplayDefinition>(
      this.definitions.creative.display.filter(
        (display) => display.size.w === width && display.size.h === height
      )
    ).markup;
  }

  public s300x250(): string {
    return this.getByDimensions(300, 250);
  }

  public s336x280(): string {
    return this.getByDimensions(336, 280);
  }

  public s728x90(): string {
    return this.getByDimensions(728, 90);
  }

  public s160x600(): string {
    return this.getByDimensions(160, 600);
  }

  public s300x600(): string {
    return this.getByDimensions(300, 600);
  }

  public s320x50(): string {
    return this.getByDimensions(320, 50);
  }

  public s320x100(): string {
    return this.getByDimensions(320, 100);
  }
}
