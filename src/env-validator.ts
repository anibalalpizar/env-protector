import type {
  ValidationSchema,
  ValidationResult,
  ValidationError,
  ValidationConfig,
} from "./types";
import { TypeValidators } from "./validators";

export class EnvValidator {
  private schema: ValidationSchema;

  constructor(schema: ValidationSchema) {
    this.schema = schema;
  }

  public validate(): ValidationResult {
    const errors: ValidationError[] = [];
    const validatedEnv: Record<string, any> = {};

    for (const [key, config] of Object.entries(this.schema)) {
      const value = process.env[key];

      if (
        config.required &&
        value === undefined &&
        config.default === undefined
      ) {
        errors.push({
          key,
          message: config.message || `${key} is required`,
        });
        continue;
      }

      const valueToValidate = value ?? config.default;

      if (valueToValidate === undefined) {
        continue;
      }

      const validationError = this.validateValue(key, valueToValidate, config);
      if (validationError) {
        errors.push(validationError);
        continue;
      }

      validatedEnv[key] = TypeValidators.convertValue(
        valueToValidate,
        config.type,
        { arrayDelimiter: config.arrayDelimiter }
      );

      if (config.type === "number") {
        const numValue = validatedEnv[key];
        if (!TypeValidators.validateRange(numValue, config.min, config.max)) {
          errors.push({
            key,
            message: `${key} must be between ${config.min} and ${config.max}`,
            value: numValue,
          });
        }
      }

      if (
        config.customValidator &&
        !config.customValidator(validatedEnv[key])
      ) {
        errors.push({
          key,
          message: config.message || `${key} failed custom validation`,
          value: validatedEnv[key],
        });
      }
    }

    return {
      isValid: errors.length === 0,
      errors,
      validatedEnv,
    };
  }

  private validateValue(
    key: string,
    value: any,
    config: ValidationConfig
  ): ValidationError | null {
    switch (config.type) {
      case "pattern":
        if (!TypeValidators.pattern(value, config.pattern)) {
          return {
            key,
            message:
              config.message || `${key} does not match the required pattern`,
            value,
          };
        }
        break;

      case "enum":
        if (!TypeValidators.enum(value, config.enum)) {
          return {
            key,
            message:
              config.message ||
              `${key} must be one of: ${config.enum?.join(", ")}`,
            value,
          };
        }
        break;

      case "array":
        if (!TypeValidators.array(value, config.arrayDelimiter)) {
          return {
            key,
            message:
              config.message ||
              `${key} must be a comma-separated list of values`,
            value,
          };
        }
        break;

      default:
        const validator = TypeValidators[config.type];
        if (!validator(value)) {
          return {
            key,
            message: config.message || `${key} must be of type ${config.type}`,
            value,
          };
        }
    }

    return null;
  }
}
