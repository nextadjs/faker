import type { IHelper } from "@/types/interface";
import { uuidv4 } from "./libraries/uuid";
import { generateRandomArrayItem } from "./utils/generator";

export class Helper implements IHelper {
  public generateUUID(): string {
    return uuidv4();
  }

  public generateRandomArrayItem<T>(array: T[]): T {
    return generateRandomArrayItem<T>(array);
  }

  public generateRandomDecimal(
    min: number,
    max: number,
    decimals: number = 2
  ): number {
    return this.generateRandomDecimal(min, max, decimals);
  }
}
