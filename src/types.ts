export type ValidationType = "string" | "number" | "boolean";

export interface ValidationConfig {
  type: ValidationType;
  required: boolean;
  message: string;
  default?: any;
}

export interface ValidationSchema {
  [key: string]: ValidationConfig;
}

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
  validatedEnv: Record<string, any>;
}
