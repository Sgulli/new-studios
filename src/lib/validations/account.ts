import * as v from 'valibot'

const accountProfileSchema = v.object({
  name: v.pipe(v.union([v.string(), v.null_()]), v.transform((s) => (s ?? '').toString())),
  email: v.pipe(v.string(), v.nonEmpty('Please provide an email.'), v.email('Enter a valid email.')),
  password: v.optional(v.string()),
  passwordConfirm: v.optional(v.string()),
})

type AccountProfile = v.InferOutput<typeof accountProfileSchema>

const passwordMatchCheck = v.check(
  (input: AccountProfile) => (input.password ?? '') === (input.passwordConfirm ?? ''),
  'The passwords do not match.',
)

export const accountFormSchema = v.pipe(accountProfileSchema, passwordMatchCheck)

export type AccountFormValues = v.InferOutput<typeof accountProfileSchema>
