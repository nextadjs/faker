export interface IHelper {
    generateUUID(): string;
    generateRandomArrayItem<T>(array: T[]): T;
}