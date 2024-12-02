export class EnumValidator {
  static validate(value: any, enumValues?: string[]): boolean {
    if (!enumValues) return false;
    return enumValues.includes(String(value));
  }
}
