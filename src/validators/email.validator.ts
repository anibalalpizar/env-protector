export class EmailValidator {
  static validate(value: any): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(String(value));
  }

  static convert(value: any): string {
    return String(value).toLowerCase();
  }
}
