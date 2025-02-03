import type { Definition } from "./definitions";
import type { Helper } from "./helper";

export abstract class Module {
  protected definitions: Definition;
  protected helper: Helper;

  public constructor({
    definitions,
    helper,
  }: {
    definitions: Definition;
    helper: Helper;
  }) {
    this.definitions = definitions;
    this.helper = helper;
  }
}
