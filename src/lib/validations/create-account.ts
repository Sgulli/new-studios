import * as v from 'valibot'

export const createAccountFormSchema = v.pipe(
  v.object({
    email: v.pipe(v.string(), v.nonEmpty('Email is required.'), v.email('Enter a valid email.')),
    password: v.pipe(v.string(), v.nonEmpty('Password is required.')),
    passwordConfirm: v.pipe(v.string(), v.nonEmpty('Please confirm your password.')),
  }),
  v.check(
    (input) => input.password === input.passwordConfirm,
    'The passwords do not match.',
  ),
)

export type CreateAccountFormValues = v.InferOutput<typeof createAccountFormSchema>
