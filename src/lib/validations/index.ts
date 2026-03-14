import * as v from 'valibot'

/**
 * Runs a Valibot schema and returns form-level errors for TanStack Form.
 * Use in validators.onSubmit.
 */
export function validateWithSchema(schema: v.BaseSchema<unknown, unknown, v.BaseIssue<unknown>>, value: unknown): string[] | undefined {
  const result = v.safeParse(schema, value, { abortPipeEarly: true })
  if (result.success) return undefined
  return result.issues.map((issue) => (issue as { message?: string }).message ?? 'Invalid')
}

/**
 * Runs a Valibot schema for a single field. Use in form.Field validators.
 */
export function validateFieldWithSchema(schema: v.BaseSchema<unknown, unknown, v.BaseIssue<unknown>>, value: unknown): string | undefined {
  const result = v.safeParse(schema, value, { abortPipeEarly: true })
  if (result.success) return undefined
  const first = result.issues[0] as { message?: string } | undefined
  return first?.message ?? 'Invalid'
}

export { contactFormSchema, type ContactFormValues } from './contact'
export { loginFormSchema, type LoginFormValues } from './login'
export { createAccountFormSchema, type CreateAccountFormValues } from './create-account'
export { forgotPasswordFormSchema, type ForgotPasswordFormValues } from './forgot-password'
export { findOrderFormSchema, type FindOrderFormValues } from './find-order'
export { accountFormSchema, type AccountFormValues } from './account'
export { addressFormSchema, type AddressFormValues } from './address'
