export class UrlValidator {
  static validate(value: any): boolean {
    try {
      new URL(String(value));
      return true;
    } catch {
      return false;
    }
  }

  static convert(value: any): string {
    return new URL(String(value)).toString();
  }
}
