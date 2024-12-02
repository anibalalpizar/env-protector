export type ValidationType =
  | "string"
  | "number"
  | "boolean"
  | "url"
  | "email"
  | "array"
  | "enum"
  | "pattern";

export interface ValidationConfig {
  type: ValidationType;
  required: boolean;
  message: string;
  default?: any;
  pattern?: RegExp;
  enum?: string[];
  min?: number;
  max?: number;
  customValidator?: (value: any) => boolean;
  arrayType?: ValidationType;
  arrayDelimiter?: string;
}

export interface ValidationSchema {
  [key: string]: ValidationConfig;
}

export interface ValidationError {
  key: string;
  message: string;
  value?: any;
  type?: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
  validatedEnv: Record<string, any>;
}
