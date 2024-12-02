export * from "./string.validator";
export * from "./number.validator";
export * from "./boolean.validator";
export * from "./url.validator";
export * from "./email.validator";
export * from "./array.validator";
export * from "./pattern.validator";
export * from "./enum.validator";

import { StringValidator } from "./string.validator";
import { NumberValidator } from "./number.validator";
import { BooleanValidator } from "./boolean.validator";
import { UrlValidator } from "./url.validator";
import { EmailValidator } from "./email.validator";
import { ArrayValidator } from "./array.validator";
import { PatternValidator } from "./pattern.validator";
import { EnumValidator } from "./enum.validator";
import type { ValidationType } from "../types";

export const TypeValidators = {
  string: StringValidator.validate,
  number: NumberValidator.validate,
  boolean: BooleanValidator.validate,
  url: UrlValidator.validate,
  email: EmailValidator.validate,
  array: ArrayValidator.validate,
  pattern: PatternValidator.validate,
  enum: EnumValidator.validate,

  validateRange: NumberValidator.validateRange,

  convertValue(value: any, type: ValidationType, options?: any): any {
    switch (type) {
      case "string":
        return StringValidator.convert(value);
      case "number":
        return NumberValidator.convert(value);
      case "boolean":
        return BooleanValidator.convert(value);
      case "url":
        return UrlValidator.convert(value);
      case "email":
        return EmailValidator.convert(value);
      case "array":
        return ArrayValidator.convert(value, options?.arrayDelimiter);
      default:
        return value;
    }
  },
};
