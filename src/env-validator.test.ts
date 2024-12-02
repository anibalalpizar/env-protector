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

  it("should validate required number variables", () => {
    process.env.PORT = "3000";

    const validator = new EnvValidator({
      PORT: {
        type: "number",
        required: true,
        message: "Port must be a number",
      },
    });

    const result = validator.validate();
    expect(result.isValid).toBe(true);
    expect(result.validatedEnv.PORT).toBe(3000);
  });

  it("should validate boolean variables", () => {
    process.env.DEBUG_MODE = "true";

    const validator = new EnvValidator({
      DEBUG_MODE: {
        type: "boolean",
        required: false,
        message: "Debug mode must be a boolean",
        default: false,
      },
    });

    const result = validator.validate();
    expect(result.isValid).toBe(true);
    expect(result.validatedEnv.DEBUG_MODE).toBe(true);
  });

  it("should use default values when variables are not provided", () => {
    const validator = new EnvValidator({
      DEBUG_MODE: {
        type: "boolean",
        required: false,
        message: "Debug mode must be a boolean",
        default: false,
      },
    });

    const result = validator.validate();
    expect(result.isValid).toBe(true);
    expect(result.validatedEnv.DEBUG_MODE).toBe(false);
  });

  it("should return errors for invalid variables", () => {
    process.env.PORT = "invalid";

    const validator = new EnvValidator({
      PORT: {
        type: "number",
        required: true,
        message: "Port must be a number",
      },
    });

    const result = validator.validate();
    expect(result.isValid).toBe(false);
    expect(result.errors).toContain("Port must be a number");
  });
});
