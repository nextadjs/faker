
export const getSecureRandom = (): number => {
  const array = new Uint32Array(1);
  crypto.getRandomValues(array);
  return array[0] / (0xffffffff + 1);
};

export const getIntInRange = (min: number, max: number): number => {
  return Math.floor(getSecureRandom() * (max - min + 1)) + min;
};

export const getFloatInRange = (
  min: number,
  max: number,
  precision: number = 2
): number => {
  const value = getSecureRandom() * (max - min) + min;
  return Number(value.toFixed(precision));
};

export const createNumberArray = (
  length: number,
  min: number,
  max: number
): number[] => {
  return Array.from({ length }, () => getIntInRange(min, max));
};

const ALPHANUMERIC_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

export const createRandomId = (length: number): string => {
  return Array.from(
    { length },
    () => ALPHANUMERIC_CHARS[getIntInRange(0, ALPHANUMERIC_CHARS.length - 1)]
  ).join("");
};

export const getRandomDate = (startDate: Date, endDate: Date): Date => {
  const start = startDate.getTime();
  const end = endDate.getTime();
  const randomTime = getIntInRange(start, end);
  return new Date(randomTime);
};

export const formatDate = (date: Date, pattern: string = "YYYY-MM-DD"): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return pattern
    .replace("YYYY", String(year))
    .replace("MM", month)
    .replace("DD", day);
};

export const pickRandom = <T>(array: T[]): T => {
  return array[getIntInRange(0, array.length - 1)];
};

export const shuffle = <T>(array: T[]): T[] => {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = getIntInRange(0, i);
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
};

type ValueGenerator<T> = () => T;

export const createRandomObject = <T extends Record<string, any>>(generators: {
  [K in keyof T]: ValueGenerator<T[K]>;
}): T => {
  const result = {} as T;
  for (const key in generators) {
    result[key] = generators[key]();
  }
  return result;
};

export const getRandomCoordinate = (
  type: "latitude" | "longitude"
): number => {
  const ranges = {
    latitude: { min: -90, max: 90 },
    longitude: { min: -180, max: 180 }
  };
  return getFloatInRange(ranges[type].min, ranges[type].max, 6);
};

export const createGeoLocation = () => ({
  latitude: getRandomCoordinate("latitude"),
  longitude: getRandomCoordinate("longitude")
});