export const generateRandomNumber = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const generateRandomDecimal = (
  min: number,
  max: number,
  decimals: number = 2
): number => {
  const value = Math.random() * (max - min) + min;
  return Number(value.toFixed(decimals));
};

export const generateNumberArray = (
  length: number,
  min: number,
  max: number
): number[] => {
  return Array.from({ length }, () => generateRandomNumber(min, max));
};

export const generateRandomString = (length: number): string => {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  return Array.from(
    { length },
    () => chars[Math.floor(Math.random() * chars.length)]
  ).join("");
};

export const generateRandomDate = (start: Date, end: Date): Date => {
  const startTime = start.getTime();
  const endTime = end.getTime();
  const randomTime = generateRandomNumber(startTime, endTime);
  return new Date(randomTime);
};

export const generateDateString = (
  date: Date,
  format: string = "YYYY-MM-DD"
): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return format
    .replace("YYYY", String(year))
    .replace("MM", month)
    .replace("DD", day);
};

export const generateRandomArrayItem = <T>(array: T[]): T => {
  return array[generateRandomNumber(0, array.length - 1)];
};

export const shuffleArray = <T>(array: T[]): T[] => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

type GeneratorFunction<T> = () => T;

export const generateRandomObject = <T extends Record<string, any>>(schema: {
  [K in keyof T]: GeneratorFunction<T[K]>;
}): T => {
  const result = {} as T;
  for (const key in schema) {
    result[key] = schema[key]();
  }
  return result;
};

export const generateRandomLatitude = (): number => {
  return generateRandomDecimal(-90, 90, 6);
};

export const generateRandomLongitude = (): number => {
  return generateRandomDecimal(-180, 180, 6);
};

export const generateRandomLocation = () => {
  return {
    latitude: generateRandomLatitude(),
    longitude: generateRandomLongitude(),
  };
};
