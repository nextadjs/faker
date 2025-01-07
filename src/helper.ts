import type { IHelper } from "@/types/interface";
import { uuidv4 } from "./libraries/uuid";

export class Helper implements IHelper {
  public generateUUID(): string {
    return uuidv4();
  }
}
