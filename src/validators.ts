import type { ValidationType } from "./types";

export class TypeValidators {
  static string(value: any): boolean {
    return typeof value === "string";
  }

  static number(value: any): boolean {
    const num = Number(value);
    return !isNaN(num) && Number.isFinite(num);
  }

  static boolean(value: any): boolean {
    const normalizedValue = String(value).toLowerCase();
    return ["true", "false", "1", "0"].includes(normalizedValue);
  }

  static url(value: any): boolean {
    try {
      new URL(String(value));
      return true;
    } catch {
      return false;
    }
  }

  static email(value: any): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(String(value));
  }

  static pattern(value: any, pattern?: RegExp): boolean {
    if (!pattern) return false;
    return pattern.test(String(value));
  }

  static enum(value: any, enumValues?: string[]): boolean {
    if (!enumValues) return false;
    return enumValues.includes(String(value));
  }

  static array(value: any, delimiter: string = ","): boolean {
    return (
      typeof value === "string" &&
      value.split(delimiter).every((item) => item.trim().length > 0)
    );
  }

  static convertValue(value: any, type: ValidationType, options?: any): any {
    switch (type) {
      case "string":
        return String(value);
      case "number":
        return Number(value);
      case "boolean":
        const normalizedValue = String(value).toLowerCase();
        return ["true", "1"].includes(normalizedValue);
      case "url":
        return new URL(String(value)).toString();
      case "email":
        return String(value).toLowerCase();
      case "array":
        const delimiter = options?.arrayDelimiter || ",";
        return String(value)
          .split(delimiter)
          .map((item) => item.trim());
      default:
        return value;
    }
  }

  static validateRange(value: number, min?: number, max?: number): boolean {
    if (min !== undefined && value < min) return false;
    if (max !== undefined && value > max) return false;
    return true;
  }
}
