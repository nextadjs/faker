import { uuidv4 } from "./libraries/uuid";
import { getSecureRandom } from "./utils/random";

export class Helper {
  /**
   * Generates a UUID v4
   */
  public generateUUID(): string {
    return uuidv4();
  }

  /**
   * Selects a random item from an array
   */
  public selectRandomArrayItem<T>(array: T[]): T {
    if (!array.length) {
      throw new Error("Array cannot be empty");
    }
    const index = Math.floor(getSecureRandom() * array.length);
    return array[index];
  }

  /**
   * Generates a random integer between min and max (inclusive)
   */
  public generateRandomNumber(min: number, max: number): number {
    if (min > max) {
      throw new Error("Min value cannot be greater than max value");
    }
    return Math.floor(getSecureRandom() * (max - min + 1)) + min;
  }

  /**
   * Generates a random decimal number between min and max with specified decimal places
   */
  public generateRandomDecimal(
    min: number,
    max: number,
    decimals: number = 2
  ): number {
    if (min > max) {
      throw new Error("Min value cannot be greater than max value");
    }
    if (decimals < 0) {
      throw new Error("Decimals cannot be negative");
    }
    
    const value = getSecureRandom() * (max - min) + min;
    return Number(value.toFixed(decimals));
  }
}