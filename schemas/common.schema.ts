import z from 'zod';

/**
 * Create a schema for a numeric ID field
 * @param field - The name of the field
 * @returns A schema for a numeric ID field
 */
export const idSchema = (field: string = 'id'): z.ZodNumber => {
  return z
    .number({
      required_error: `${field} is required`,
      invalid_type_error: `${field} must be a number`,
    })
    .int({
      message: `${field} must be an integer`,
    })
    .positive({
      message: `${field} must be a positive number`,
    });
};
