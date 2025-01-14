import { uuidv4 } from "./libraries/uuid";
import {
  generateRandomArrayItem,
  generateRandomDecimal,
} from "./utils/generator";

export class Helper {
  public generateUUID(): string {
    return uuidv4();
  }

  public selectRandomArrayItem<T>(array: T[]): T {
    return generateRandomArrayItem<T>(array);
  }

  public generateRandomNumber(min: number, max: number): number {
    return this.generateRandomNumber(min, max);
  }

  public generateRandomDecimal(
    min: number,
    max: number,
    decimals: number = 2
  ): number {
    return generateRandomDecimal(min, max, decimals);
  }
}
