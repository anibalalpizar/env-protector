export class ArrayValidator {
  static validate(value: any, delimiter: string = ","): boolean {
    return (
      typeof value === "string" &&
      value.split(delimiter).every((item) => item.trim().length > 0)
    );
  }

  static convert(value: any, delimiter: string = ","): string[] {
    return String(value)
      .split(delimiter)
      .map((item) => item.trim());
  }
}
