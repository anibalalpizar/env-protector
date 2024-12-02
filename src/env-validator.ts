import type { ValidationSchema, ValidationResult } from "./types";
import { TypeValidators } from "./validators";

export class EnvValidator {
  private schema: ValidationSchema;

  constructor(schema: ValidationSchema) {
    this.schema = schema;
  }

  public validate(): ValidationResult {
    const errors: string[] = [];
    const validatedEnv: Record<string, any> = {};

    for (const [key, config] of Object.entries(this.schema)) {
      const value = process.env[key];

      if (
        config.required &&
        value === undefined &&
        config.default === undefined
      ) {
        errors.push(config.message || `${key} is required`);
        continue;
      }

      const valueToValidate = value ?? config.default;

      if (valueToValidate === undefined) {
        continue;
      }

      const validator = TypeValidators[config.type];
      if (!validator(valueToValidate)) {
        errors.push(config.message || `${key} must be of type ${config.type}`);
        continue;
      }

      validatedEnv[key] = TypeValidators.convertValue(
        valueToValidate,
        config.type
      );
    }

    return {
      isValid: errors.length === 0,
      errors,
      validatedEnv,
    };
  }
}
