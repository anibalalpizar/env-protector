import type { ValidationType } from "./types";

export class TypeValidators {
  static string(value: any): boolean {
    return typeof value === "string";
  }

  static number(value: any): boolean {
    const num = Number(value);
    return !isNaN(num) && Number.isInteger(num);
  }

  static boolean(value: any): boolean {
    const normalizedValue = String(value).toLowerCase();
    return ["true", "false", "1", "0"].includes(normalizedValue);
  }

  static convertValue(value: any, type: ValidationType): any {
    switch (type) {
      case "string":
        return String(value);
      case "number":
        return Number(value);
      case "boolean":
        const normalizedValue = String(value).toLowerCase();
        return ["true", "1"].includes(normalizedValue);
      default:
        return value;
    }
  }
}
