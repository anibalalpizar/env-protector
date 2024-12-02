export class StringValidator {
  static validate(value: string): boolean {
    return typeof value === "string";
  }

  static convert(value: any): string {
    return String(value);
  }
}
