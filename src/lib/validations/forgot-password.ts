import * as v from 'valibot'

export const forgotPasswordFormSchema = v.object({
  email: v.pipe(v.string(), v.nonEmpty('Please provide your email.'), v.email('Enter a valid email.')),
})

export type ForgotPasswordFormValues = v.InferOutput<typeof forgotPasswordFormSchema>
