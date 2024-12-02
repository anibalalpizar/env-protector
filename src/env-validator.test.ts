import { describe, it, expect, beforeEach } from "vitest";
import { EnvValidator } from "./env-validator";

describe("EnvValidator", () => {
  beforeEach(() => {
    process.env = {};
  });

  it("should validate required string variables", () => {
    process.env.DATABASE_URL = "postgresql://localhost:5432/db";

    const validator = new EnvValidator({
      DATABASE_URL: {
        type: "string",
        required: true,
        message: "Database URL is required",
      },
    });

    const result = validator.validate();
    expect(result.isValid).toBe(true);
    expect(result.validatedEnv.DATABASE_URL).toBe(
      "postgresql://localhost:5432/db"
    );
  });

  it("should validate URL variables", () => {
    process.env.API_URL = "https://api.example.com";

    const validator = new EnvValidator({
      API_URL: {
        type: "url",
        required: true,
        message: "API URL must be a valid URL",
      },
    });

    const result = validator.validate();
    expect(result.isValid).toBe(true);
    expect(result.validatedEnv.API_URL).toBe("https://api.example.com/");
  });

  it("should validate email variables", () => {
    process.env.ADMIN_EMAIL = "admin@example.com";

    const validator = new EnvValidator({
      ADMIN_EMAIL: {
        type: "email",
        required: true,
        message: "Admin email must be valid",
      },
    });

    const result = validator.validate();
    expect(result.isValid).toBe(true);
    expect(result.validatedEnv.ADMIN_EMAIL).toBe("admin@example.com");
  });

  it("should validate pattern variables", () => {
    process.env.API_KEY = "sk_test_123456";

    const validator = new EnvValidator({
      API_KEY: {
        type: "pattern",
        required: true,
        pattern: /^sk_test_[a-zA-Z0-9]+$/,
        message: "Invalid API key format",
      },
    });

    const result = validator.validate();
    expect(result.isValid).toBe(true);
  });

  it("should validate enum variables", () => {
    process.env.LOG_LEVEL = "info";

    const validator = new EnvValidator({
      LOG_LEVEL: {
        type: "enum",
        required: true,
        enum: ["debug", "info", "warn", "error"],
        message: "Invalid log level",
      },
    });

    const result = validator.validate();
    expect(result.isValid).toBe(true);
  });

  it("should validate array variables", () => {
    process.env.ALLOWED_ORIGINS = "http://localhost:3000,https://example.com";

    const validator = new EnvValidator({
      ALLOWED_ORIGINS: {
        type: "array",
        required: true,
        message: "Allowed origins must be a comma-separated list",
      },
    });

    const result = validator.validate();
    expect(result.isValid).toBe(true);
    expect(result.validatedEnv.ALLOWED_ORIGINS).toEqual([
      "http://localhost:3000",
      "https://example.com",
    ]);
  });

  it("should validate number ranges", () => {
    process.env.PORT = "3000";

    const validator = new EnvValidator({
      PORT: {
        type: "number",
        required: true,
        min: 1024,
        max: 65535,
        message: "Port must be between 1024 and 65535",
      },
    });

    const result = validator.validate();
    expect(result.isValid).toBe(true);
  });

  it("should support custom validators", () => {
    process.env.PASSWORD = "StrongP@ss123";

    const validator = new EnvValidator({
      PASSWORD: {
        type: "string",
        required: true,
        message: "Password must be strong",
        customValidator: (value: string) => {
          return (
            value.length >= 8 &&
            /[A-Z]/.test(value) &&
            /[a-z]/.test(value) &&
            /[0-9]/.test(value) &&
            /[^A-Za-z0-9]/.test(value)
          );
        },
      },
    });

    const result = validator.validate();
    expect(result.isValid).toBe(true);
  });
});
