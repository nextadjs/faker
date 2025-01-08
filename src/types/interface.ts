export interface IHelper {
  generateUUID(): string;
  generateRandomArrayItem<T>(array: T[]): T;
  generateRandomDecimal(min: number, max: number, decimals?: number): number;
}
