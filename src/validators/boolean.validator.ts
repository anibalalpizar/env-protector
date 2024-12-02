export class BooleanValidator {
  static validate(value: any): boolean {
    const normalizedValue = String(value).toLowerCase();
    return ["true", "false", "1", "0"].includes(normalizedValue);
  }

  static convert(value: any): boolean {
    const normalizedValue = String(value).toLowerCase();
    return ["true", "1"].includes(normalizedValue);
  }
}
