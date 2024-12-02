export class PatternValidator {
  static validate(value: any, pattern?: RegExp): boolean {
    if (!pattern) return false;
    return pattern.test(String(value));
  }
}
