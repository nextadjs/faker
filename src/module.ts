import type { Definition } from "./definitions";
import type { IHelper } from "@/types/interface";

export abstract class Module {
  protected definitions: Definition;
  protected helper: IHelper;

  public constructor({
    definitions,
    helper,
  }: {
    definitions: Definition;
    helper: IHelper;
  }) {
    this.definitions = definitions;
    this.helper = helper;
  }
}
