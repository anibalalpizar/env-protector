export class NumberValidator {
  static validate(value: any): boolean {
    const num = Number(value);
    return !isNaN(num) && Number.isFinite(num);
  }

  static validateRange(value: number, min?: number, max?: number): boolean {
    if (min !== undefined && value < min) return false;
    if (max !== undefined && value > max) return false;
    return true;
  }

  static convert(value: any): number {
    return Number(value);
  }
}
