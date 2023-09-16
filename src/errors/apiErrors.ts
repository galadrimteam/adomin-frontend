import { z } from "zod";

export const zApiSimpleError = z.object({
  error: z.string(),
});

export type ApiSimpleError = z.infer<typeof zApiSimpleError>;

export const zApiFormError = z.object({
  rule: z.string(),
  field: z.string(),
  message: z.string(),
});

export type ApiFormError = z.infer<typeof zApiFormError>;

export const zApiFormErrors = z.object({
  errors: z.array(zApiFormError),
});
export type ApiFormErrors = z.infer<typeof zApiFormErrors>;

export const isApiSimpleError = (input: unknown): input is ApiSimpleError =>
  zApiSimpleError.safeParse(input).success;

export const isApiFormErrors = (input: unknown): input is ApiFormErrors =>
  zApiFormErrors.safeParse(input).success;

export const zApiErrors = z.object({
  errors: z.array(z.object({ message: z.string() })),
});

export type ApiErrors = z.infer<typeof zApiErrors>;

export const isApiErrors = (input: unknown): input is ApiErrors =>
  zApiErrors.safeParse(input).success;

const zAdonisError = z.object({
  code: z.string(),
  message: z.string(),
  stack: z.string(),
});

export type AdonisError = z.infer<typeof zAdonisError>;

export const isAdonisError = (input: unknown): input is AdonisError =>
  zAdonisError.safeParse(input).success;
